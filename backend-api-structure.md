// Backend API Structure for Expense Reporting
// This file shows what the backend API endpoints should look like

import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { FilterAndPaginationExpenseDto } from './dto/filter-and-pagination-expense.dto';
import { ResponsePayload } from '../interfaces/core/response-payload.interface';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  // Existing endpoints...
  @Post('/get-all-by-shop')
  @UsePipes(ValidationPipe)
  async getAllExpenseByShop(
    @Body() filterExpenseDto: FilterAndPaginationExpenseDto,
    @Query('shop', MongoIdValidationPipe) shop: string,
    @Query('q') searchString: string,
  ): Promise<ResponsePayload> {
    return await this.expenseService.getAllExpenseByShop(
      shop,
      filterExpenseDto,
      searchString,
    );
  }

  // New reporting endpoints
  @Get('/summary')
  async getExpenseSummary(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('category') category?: string,
  ): Promise<ResponsePayload> {
    return await this.expenseService.getExpenseSummary(from, to, category);
  }

  @Get('/report')
  async getExpenseReport(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('period') period: 'weekly' | 'monthly' | 'yearly' = 'monthly',
  ): Promise<ResponsePayload> {
    return await this.expenseService.getExpenseReport(from, to, period);
  }

  @Get('/generate-pdf-report')
  async generatePDFReport(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('period') period: 'weekly' | 'monthly' | 'yearly' = 'monthly',
  ): Promise<Buffer> {
    return await this.expenseService.generatePDFReport(from, to, period);
  }

  @Get('/report-data')
  async getExpenseReportData(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('period') period: 'weekly' | 'monthly' | 'yearly' = 'monthly',
  ): Promise<ResponsePayload> {
    return await this.expenseService.getExpenseReportData(from, to, period);
  }
}

// Service Implementation Example
export class ExpenseService {
  // ... existing methods ...

  async getExpenseSummary(from: string, to: string, category?: string): Promise<ResponsePayload> {
    try {
      const startDate = new Date(from);
      const endDate = new Date(to);
      
      // Aggregate pipeline for summary
      const summaryPipeline = [
        {
          $match: {
            date: { $gte: startDate, $lte: endDate },
            ...(category && { 'category._id': new ObjectId(category) }),
            status: { $ne: 'trash' }
          }
        },
        {
          $group: {
            _id: '$category._id',
            name: { $first: '$category.name' },
            total: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: null,
            byCategory: { $push: '$$ROOT' },
            grand: { $sum: '$total' }
          }
        }
      ];

      const summary = await this.expenseModel.aggregate(summaryPipeline);
      
      return {
        success: true,
        message: 'Expense summary retrieved successfully',
        data: summary[0] || { byCategory: [], grand: { total: 0 } }
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getExpenseReport(from: string, to: string, period: string): Promise<ResponsePayload> {
    try {
      const startDate = new Date(from);
      const endDate = new Date(to);
      
      // Get detailed expense data for the period
      const expenses = await this.expenseModel.find({
        date: { $gte: startDate, $lte: endDate },
        status: { $ne: 'trash' }
      }).populate('category._id', 'name').sort({ date: -1 });

      return {
        success: true,
        message: 'Expense report retrieved successfully',
        data: expenses
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async generatePDFReport(from: string, to: string, period: string): Promise<Buffer> {
    try {
      // Get report data
      const reportData = await this.getExpenseReportData(from, to, period);
      
      // Generate PDF using a library like puppeteer or pdfkit
      const pdfBuffer = await this.pdfGenerator.generateExpenseReport(reportData.data);
      
      return pdfBuffer;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getExpenseReportData(from: string, to: string, period: string): Promise<ResponsePayload> {
    try {
      const startDate = new Date(from);
      const endDate = new Date(to);
      
      // Get summary data
      const summary = await this.getExpenseSummary(from, to);
      
      // Get detailed report
      const report = await this.getExpenseReport(from, to, period);
      
      // Get shop information for the report
      const shopInfo = await this.getShopInformation();
      
      return {
        success: true,
        message: 'Expense report data retrieved successfully',
        data: {
          summary: summary.data,
          report: report.data,
          shopInfo: shopInfo,
          dateRange: { from: startDate, to: endDate },
          generatedAt: new Date()
        }
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async getShopInformation() {
    // This should return shop/business information for the report header
    return {
      name: 'Your Business Name',
      address: 'Your Business Address',
      phone: 'Your Phone Number',
      email: 'Your Email',
      website: 'Your Website'
    };
  }
}

// DTO for filtering
export class FilterAndPaginationExpenseDto {
  filter?: any;
  pagination?: {
    pageSize: number;
    currentPage: number;
  };
  sort?: any;
  select?: any;
  filterGroup?: {
    isGroup: boolean;
    expense?: boolean;
  };
}
