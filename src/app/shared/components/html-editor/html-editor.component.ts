import {
  Component,
  ElementRef,
  forwardRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Gallery } from '../../../interfaces/gallery/gallery.interface';
import { MyGalleryComponent } from '../../../pages/my-gallery/my-gallery.component';
import { MyGalleryModule } from '../../../pages/my-gallery/my-gallery.module';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { Dropdown } from '../dropdown/interfaces/dropdown.interface';

@Component({
  selector: 'app-html-editor',
  standalone: true,
  imports: [MatButtonModule, DropdownComponent, MyGalleryModule],
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HtmlEditorComponent),
      multi: true,
    },
  ],
})
export class HtmlEditorComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  // Main Editor
  @ViewChild('editor', { static: true }) editor: ElementRef;

  // Color
  @ViewChild('colorPickerDropdown') colorPickerDropdown!: ElementRef;

  // link
  @ViewChild('linkMenu') linkMenu: ElementRef;
  private selectedLink: HTMLElement | null = null;

  // Image
  @ViewChild('imageController') imageController!: ElementRef;
  @ViewChild('imageControllerOtp') imageControllerOtp!: ElementRef;
  private selectedImage: HTMLImageElement | null = null;
  private resizeHandle: string | null = null;
  private initialMouseX: number = 0;
  private initialMouseY: number = 0;
  private initialImageWidth: number = 0;
  private initialImageHeight: number = 0;
  private resizeMouseMoveListener: (() => void) | null = null;
  private resizeMouseUpListener: (() => void) | null = null;

  // Toggle
  currentTextStyle: string[] = [];
  currentTextColor: string = '#000000';

  // Inject
  private renderer = inject(Renderer2);
  private readonly dialog = inject(MatDialog);

  // Data
  readonly typography: Dropdown[] = [
    { value: 'p', viewValue: 'Paragraph', class: 'font-size-12' },
    { value: 'h6', viewValue: 'Heading 6', class: 'font-size-16' },
    { value: 'h5', viewValue: 'Heading 5', class: 'font-size-18' },
    { value: 'h4', viewValue: 'Heading 4', class: 'font-size-20' },
    { value: 'h3', viewValue: 'Heading 3', class: 'font-size-24' },
    { value: 'h2', viewValue: 'Heading 2', class: 'font-size-30' },
    { value: 'h1', viewValue: 'Heading 1', class: 'font-size-34' },
  ];

  readonly fontSizes: Dropdown[] = [
    { value: '14px', viewValue: '14px', class: 'font-size-14' },
    { value: '16px', viewValue: '16px', class: 'font-size-16' },
    { value: '18px', viewValue: '18px', class: 'font-size-18' },
    { value: '24px', viewValue: '24px', class: 'font-size-24' },
    { value: '32px', viewValue: '32px', class: 'font-size-32' },
    { value: '36px', viewValue: '36px', class: 'font-size-36' },
    { value: '48px', viewValue: '48px', class: 'font-size-48' },
    { value: '56px', viewValue: '56px', class: 'font-size-56' },
  ];

  readonly textAligns: Dropdown[] = [
    { value: 'left', viewValue: 'Left', class: 'font-size-14' },
    { value: 'center', viewValue: 'Center', class: 'font-size-14' },
    { value: 'right', viewValue: 'Right', class: 'font-size-14' },
  ];

  // Complex auto-detect the editor changes
  private observer: MutationObserver;
  private onChange: (value: string) => void;
  private onTouched: () => void;

  ngOnInit() {
    // Listen for click events on the document to hide the image controller
    this.renderer.listen('document', 'click', (event) => {
      this.onDocumentClick(event);
    });

    // Listen for keydown events for Delete or Backspace
    this.renderer.listen('document', 'keydown', (event) => {
      this.onKeyDown(event);
    });

    // Listen for the keydown event to handle Enter key inside blockquote
    // this.renderer.listen(this.editor.nativeElement, 'keydown', (event: KeyboardEvent) => {
    //   if (event.key === 'Enter') {
    //     this.handleEnterInBlockquote(event);
    //   }
    // });

    this.renderer.listen(
      this.editor.nativeElement,
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0) return;

          const range = selection.getRangeAt(0);
          const isInsideBlockquote = this.findAncestor(
            range.startContainer,
            'blockquote'
          );
          console.log('loges-----', event.key);
          if (event.shiftKey) {
            console.log('only shift key loges-----', event.key);

            // SHIFT + ENTER → Insert <br>
            event.preventDefault();

            const br = document.createElement('br');
            range.deleteContents();
            range.insertNode(br);

            range.setStartAfter(br);
            range.collapse(true);

            selection.removeAllRanges();
            selection.addRange(range);
            this.onEditorContentChange();
          } else if (isInsideBlockquote) {
            // Regular Enter inside blockquote (optional behavior)
            this.handleEnterInBlockquote(event);
          }
          // Else, allow default Enter behavior (creates new paragraph)
        }
      }
    );

    this.renderer.listen(
      this.editor.nativeElement,
      'paste',
      (event: ClipboardEvent) => {
        this.handlePaste(event);
      }
    );

    // Listen for focus events to ensure images are responsive
    this.renderer.listen(this.editor.nativeElement, 'focus', () => {
      setTimeout(() => {
        this.makeExistingImagesResponsive();
      }, 100);
    });

    // auto-detect the editor changes
    this.observer = new MutationObserver((mutations) => {
      this.onEditorContentChange();
    });
  }

  ngAfterViewInit() {
    if (this.editor) {
      this.observer.observe(this.editor.nativeElement, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      // Add click event listener to images
      this.addImageClickListener();

      // Make any existing images responsive immediately
      setTimeout(() => {
        this.makeExistingImagesResponsive();
      }, 100);
    }
  }

  /**
   * Text Format
   * formatText()
   * formatListText()
   * formatTextStyle()
   * alignText()
   * changeFontSize()
   */
  formatText(command: string) {
    document.execCommand('formatBlock', false, command);
  }

  formatListText(command: string) {
    document.execCommand(command, false, null);
  }

  formatTextStyle(command: string) {
    document.execCommand(command, false);

    const exists = this.currentTextStyle.includes(command);
    if (exists) {
      this.currentTextStyle = this.currentTextStyle.filter(
        (item) => item !== command
      );
    } else {
      this.currentTextStyle.push(command);
    }
  }

  alignText(alignment: string) {
    document.execCommand('justify' + alignment, false, null);
  }

  changeFontSize(size: string) {
    // const size = (event.target as HTMLSelectElement).value;
    document.execCommand('fontSize', false, '7'); // 7 is the maximum value for `fontSize` command
    const elements =
      this.editor.nativeElement.querySelectorAll('font[size="7"]');
    elements.forEach((element: HTMLElement) => {
      element.removeAttribute('size');
      element.style.fontSize = size;
    });
  }

  insertYouTubeLink() {
    const url = prompt('Enter the YouTube URL');

    // Regular expression to extract YouTube video ID
    // const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/;

    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)|(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
    const match = url ? url.match(regex) : null;
    const videoId = match ? match[1] || match[2] || match[3] : null;

    if (videoId) {
      // Create a responsive wrapper div
      const wrapper = document.createElement('div');
      wrapper.className = 'video-container'; // Add a class for styling

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.frameBorder = '0';
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;

      wrapper.appendChild(iframe);

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(wrapper);

        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      alert('Invalid YouTube URL');
    }
  }

  /**
   * Handle Paste Event
   * Preserves content formatting while ensuring images are responsive and maintainable.
   */
  handlePaste(event: ClipboardEvent) {
    event.preventDefault();

    // Get the pasted content
    const clipboardData = event.clipboardData;
    const pastedHtml =
      clipboardData?.getData('text/html') ||
      clipboardData?.getData('text/plain');

    if (pastedHtml) {
      // Create a temporary container to process the content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = pastedHtml;

      // Process the content to preserve formatting while making images responsive
      this.processPastedContent(tempDiv);

      // Insert the processed content into the editor
      const selection = window.getSelection();
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        range.deleteContents();

        const fragment = document.createDocumentFragment();
        Array.from(tempDiv.childNodes).forEach((node) =>
          fragment.appendChild(node)
        );
        range.insertNode(fragment);

        // Set cursor after the inserted content
        range.setStartAfter(fragment.lastChild || range.startContainer);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);

        // Process images after insertion to ensure they're responsive and have resize functionality
        setTimeout(() => {
          this.processPastedImages();
          // Also ensure click listeners are attached using the standard method
          this.addImageClickListener();
          this.onEditorContentChange();
        }, 0);
      }
    }
  }

  /**
   * Process Pasted Content
   * Preserves text formatting and styles while preparing images for responsive display.
   */
  processPastedContent(container: HTMLElement) {
    // First, handle images - preserve alignment but make responsive
    const images = container.querySelectorAll('img');
    images.forEach((img: HTMLImageElement) => {
      // Get original alignment/styles from inline styles and parent
      const originalFloat = img.style.float || '';
      const parent = img.parentElement;
      const parentTextAlign = parent ? parent.style.textAlign || '' : '';
      const originalMargin = img.style.margin || '';
      const originalDisplay = img.style.display || '';

      // Remove fixed width attributes
      img.removeAttribute('width');
      img.removeAttribute('height');

      // Preserve alignment intent based on inline styles and parent alignment
      // Check for left alignment
      const isLeftAligned =
        originalFloat === 'left' ||
        img.getAttribute('align') === 'left' ||
        parentTextAlign === 'left' ||
        (parent && parent.style.textAlign === 'left');

      // Check for right alignment
      const isRightAligned =
        originalFloat === 'right' ||
        img.getAttribute('align') === 'right' ||
        parentTextAlign === 'right' ||
        (parent && parent.style.textAlign === 'right');

      // Check for center alignment
      const isCentered =
        parentTextAlign === 'center' ||
        (parent && parent.style.textAlign === 'center') ||
        img.getAttribute('align') === 'center' ||
        (originalDisplay === 'block' && originalMargin.includes('auto'));

      // Remove only fixed width/max-width that would break responsiveness
      if (img.style.width && !img.style.width.includes('%')) {
        img.style.width = '';
      }
      if (img.style.maxWidth && !img.style.maxWidth.includes('%')) {
        img.style.maxWidth = '';
      }
      if (img.style.minWidth) {
        img.style.minWidth = '';
      }

      // Preserve alignment based on original intent
      if (isLeftAligned) {
        img.style.display = 'inline';
        img.style.float = 'left';
        img.style.margin = '10px 10px 10px 0';
        img.style.maxWidth = '100%';
      } else if (isRightAligned) {
        img.style.display = 'inline';
        img.style.float = 'right';
        img.style.margin = '10px 0 10px 10px';
        img.style.maxWidth = '100%';
      } else if (isCentered) {
        img.style.display = 'block';
        img.style.margin = '10px auto';
        img.style.float = 'none';
        img.style.maxWidth = '100%';
      } else {
        // Default: center aligned and responsive
        img.style.display = 'block';
        img.style.margin = '10px auto';
        img.style.float = 'none';
        img.style.maxWidth = '100%';
      }

      // Ensure height is auto for responsive behavior
      img.style.height = 'auto';
      img.style.boxSizing = 'border-box';
      img.style.objectFit = 'contain';

      // Remove width/height attributes to prevent mobile issues
      img.removeAttribute('width');
      img.removeAttribute('height');

      // Add responsive class
      img.classList.add('responsive-image');
    });

    // For non-image elements, preserve most formatting but remove fixed widths
    const allElements = container.querySelectorAll('*');
    allElements.forEach((el) => {
      const htmlElement = el as HTMLElement;

      // Skip images as they're already processed
      if (htmlElement.tagName === 'IMG') return;

      // Remove fixed pixel widths (but preserve percentages)
      if (htmlElement.style.width && !htmlElement.style.width.includes('%')) {
        htmlElement.style.width = '';
      }
      if (
        htmlElement.style.maxWidth &&
        !htmlElement.style.maxWidth.includes('%')
      ) {
        htmlElement.style.maxWidth = '';
      }
      if (htmlElement.style.minWidth) {
        htmlElement.style.minWidth = '';
      }

      // Remove width attributes
      htmlElement.removeAttribute('width');
      htmlElement.removeAttribute('max-width');
      htmlElement.removeAttribute('min-width');
    });
  }

  /**
   * Process Pasted Images
   * Ensures all pasted images have click listeners and resize functionality.
   */
  processPastedImages() {
    if (!this.editor?.nativeElement) return;

    const images = this.editor.nativeElement.querySelectorAll('img');
    images.forEach((img: HTMLImageElement) => {
      // Check if image already has alignment set (from paste processing)
      const computedStyle = window.getComputedStyle(img);
      const hasAlignment =
        img.style.float === 'left' ||
        img.style.float === 'right' ||
        computedStyle.float === 'left' ||
        computedStyle.float === 'right' ||
        (computedStyle.display === 'block' &&
          (img.style.margin || computedStyle.margin).includes('auto'));

      // Apply responsive styles if not already applied, preserving alignment if set
      if (!img.classList.contains('responsive-image')) {
        this.applyResponsiveImageStyles(img, hasAlignment);
      } else {
        // Ensure max-width is set even if class exists (safety check)
        if (!img.style.maxWidth || img.style.maxWidth === 'none') {
          img.style.setProperty('max-width', '100%', 'important');
        }
        if (!img.style.height || img.style.height === 'none') {
          img.style.setProperty('height', 'auto', 'important');
        }
      }

      // Remove existing listener attribute to ensure clean state
      img.removeAttribute('data-listener-added');

      // Remove any existing click listeners by cloning (if needed)
      // But first, ensure the image is properly set up

      // Ensure contentEditable is false but image is still clickable
      img.contentEditable = 'false';

      // Add click listener with proper event handling
      img.addEventListener(
        'click',
        (ev: MouseEvent) => {
          ev.stopPropagation();
          ev.preventDefault();
          this.selectedImage = img;
          this.showImageResizeController(img);
          this.showImageBasicController(img);
        },
        true
      ); // Use capture phase to ensure it fires

      img.setAttribute('data-listener-added', 'true');
    });
  }

  /**
   * Table Insertion Method
   */
  // insertTable() {
  //   // Prompt the user for the number of rows and columns
  //   const rowsCount = parseInt(prompt('Enter the number of rows:', '5'), 10);
  //   const columnsCount = parseInt(prompt('Enter the number of columns:', '3'), 10);
  //
  //   // Validate the input
  //   if (isNaN(rowsCount) || isNaN(columnsCount) || rowsCount <= 0 || columnsCount <= 0) {
  //     alert('Please enter valid positive numbers for rows and columns.');
  //     return;
  //   }
  //
  //   // Create the table element
  //   const table = document.createElement('table');
  //   table.style.width = '100%';
  //   table.style.borderCollapse = 'collapse';
  //   table.style.margin = '10px 0';
  //   table.style.border = '1px solid #ddd'; // Optional: Add a border for visibility
  //
  //   for (let i = 0; i < rowsCount; i++) {
  //     const tr = document.createElement('tr');
  //
  //     for (let j = 0; j < columnsCount; j++) {
  //       const td = document.createElement('td');
  //       td.style.padding = '10px';
  //       td.style.border = '1px solid #ddd'; // Optional: Add a border for visibility
  //       td.style.textAlign = 'left';
  //       td.textContent = i === 0 ? `Header ${j + 1}` : ''; // Placeholder header for first row
  //       tr.appendChild(td);
  //     }
  //
  //     table.appendChild(tr);
  //   }
  //
  //   // Insert the table at the current cursor position
  //   const selection = window.getSelection();
  //   if (selection && selection.rangeCount > 0) {
  //     const range = selection.getRangeAt(0);
  //     range.deleteContents();
  //     range.insertNode(table);
  //
  //     // Move the caret after the table
  //     range.setStartAfter(table);
  //     range.collapse(true);
  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //   }
  // }
  insertTable() {
    // Prompt the user for the number of rows and columns
    const rowsCount = parseInt(prompt('Enter the number of rows:', '5'), 10);
    const columnsCount = parseInt(
      prompt('Enter the number of columns:', '3'),
      10
    );

    // Validate the input
    if (
      isNaN(rowsCount) ||
      isNaN(columnsCount) ||
      rowsCount <= 0 ||
      columnsCount <= 0
    ) {
      alert('Please enter valid positive numbers for rows and columns.');
      return;
    }

    // Create the table element
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.style.margin = '10px 0';
    table.style.border = '1px solid #ddd'; // Optional: Add a border for visibility

    for (let i = 0; i < rowsCount; i++) {
      const tr = document.createElement('tr');

      for (let j = 0; j < columnsCount; j++) {
        const td = document.createElement('td');
        td.style.padding = '10px';
        td.style.border = '1px solid #ddd'; // Optional: Add a border for visibility
        td.style.textAlign = 'left';

        // Add default text to all cells
        td.textContent = `Text ${i + 1}-${j + 1}`;
        tr.appendChild(td);
      }

      table.appendChild(tr);
    }

    // Insert the table at the current cursor position
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(table);

      // Move the caret after the table
      range.setStartAfter(table);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /**
   * Color Control
   * changeTextColor()
   * changeBackgroundColor()
   * toggleColorPickers()
   * hideColorPickers()
   */

  changeTextColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    this.currentTextColor = color;
    document.execCommand('foreColor', false, color);
  }

  changeBackgroundColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    document.execCommand('hiliteColor', false, color);
  }

  toggleColorPickers(event: Event) {
    event.stopPropagation();
    const dropdown = this.colorPickerDropdown.nativeElement;
    if (dropdown.style.display === 'none' || !dropdown.style.display) {
      dropdown.style.display = 'flex'; // Ensure flex display for side-by-side layout
    } else {
      dropdown.style.display = 'none';
    }
  }

  hideColorPickers() {
    this.colorPickerDropdown.nativeElement.style.display = 'none';
  }

  /**
   * Blockquote Control
   * toggleBlockquote()
   * handleEnterInBlockquote()
   * findAncestor()
   * addBlockquote()
   * removeBlockquote()
   * applyBlockquoteStyle()
   */

  toggleBlockquote() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;
    const blockquote = this.findAncestor(commonAncestor, 'blockquote');

    if (blockquote) {
      this.removeBlockquote(blockquote);
    } else {
      this.addBlockquote(range);
    }
  }

  handleEnterInBlockquote(event: KeyboardEvent) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const blockquote = this.findAncestor(
      range.commonAncestorContainer,
      'blockquote'
    );

    if (blockquote) {
      event.preventDefault(); // Prevent the default behavior of Enter key

      // Move the caret outside of the blockquote
      range.setStartAfter(blockquote);
      range.setEndAfter(blockquote);
      selection.removeAllRanges();
      selection.addRange(range);

      // Insert a new empty paragraph or div
      const newParagraph = document.createElement('p');
      newParagraph.innerHTML = '<br>'; // Ensures there's a space for the caret
      blockquote.parentNode?.insertBefore(newParagraph, blockquote.nextSibling);

      // Place the caret inside the new paragraph
      range.setStart(newParagraph, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  findAncestor(node: Node, tagName: string): HTMLElement | null {
    while (node) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        (node as HTMLElement).tagName.toLowerCase() === tagName.toLowerCase()
      ) {
        return node as HTMLElement;
      }
      node = node.parentNode!;
    }
    return null;
  }

  addBlockquote(range: Range) {
    const blockquote = this.renderer.createElement('blockquote');
    range.surroundContents(blockquote);
    this.applyBlockquoteStyle(blockquote);
  }

  removeBlockquote(blockquote: HTMLElement) {
    const parent = blockquote.parentNode!;
    while (blockquote.firstChild) {
      parent.insertBefore(blockquote.firstChild, blockquote);
    }
    parent.removeChild(blockquote);
  }

  applyBlockquoteStyle(blockquote: HTMLElement) {
    this.renderer.setStyle(blockquote, 'border-left', '4px solid #ccc');
    this.renderer.setStyle(blockquote, 'margin', '10px 0');
    this.renderer.setStyle(blockquote, 'padding', '10px 20px');
    this.renderer.setStyle(blockquote, 'background-color', '#f9f9f9');
    this.renderer.setStyle(blockquote, 'font-style', 'italic');
    this.renderer.setStyle(blockquote, 'color', '#555');
  }

  /**
   * Url Controller
   * createLink()
   * onEditorClick()
   * showLinkMenu()
   * hideLinkMenu()
   * changeLink()
   * removeLink()
   */
  createLink() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString().trim();

    // Regular expression to check if the selected text is a URL
    const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;

    let url = '';

    if (selectedText && urlRegex.test(selectedText)) {
      url = prompt('Enter the URL', selectedText) || '';
    } else {
      url = prompt('Enter the URL');
    }

    if (url) {
      const range = selection.getRangeAt(0);

      // Create an anchor element and set its href attribute
      const link = document.createElement('a');
      link.href = url;
      link.textContent = selectedText;

      // Ensure the anchor element is inline and add the hover effect
      link.style.display = 'inline';
      link.style.textDecoration = 'none'; // No underline by default

      // Add the hover effect for underline
      link.addEventListener('mouseover', () => {
        link.style.textDecoration = 'underline';
      });
      link.addEventListener('mouseout', () => {
        link.style.textDecoration = 'none';
      });

      // Insert the link within the range without disrupting the text flow
      range.deleteContents();
      range.insertNode(link);

      // Move the caret after the inserted link
      range.setStartAfter(link);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  onEditorClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A') {
      this.selectedLink = target;
      this.showLinkMenu(target);
      event.preventDefault(); // Prevent default link behavior
    } else if (target.tagName === 'IMG') {
      // Handle image click - show resize controller
      event.stopPropagation();
      this.selectedImage = target as HTMLImageElement;
      this.showImageResizeController(target as HTMLImageElement);
      this.showImageBasicController(target as HTMLImageElement);
    } else {
      this.hideLinkMenu();
    }
  }

  showLinkMenu(link: HTMLElement) {
    const rect = link.getBoundingClientRect();
    const menu = this.linkMenu.nativeElement;
    this.renderer.setStyle(menu, 'top', `${rect.bottom + window.scrollY}px`);
    this.renderer.setStyle(menu, 'left', `${rect.left + window.scrollX}px`);
    this.renderer.setStyle(menu, 'display', 'block');
  }

  hideLinkMenu() {
    this.renderer.setStyle(this.linkMenu.nativeElement, 'display', 'none');
    this.selectedLink = null;
  }

  changeLink() {
    if (this.selectedLink) {
      const url = prompt(
        'Enter the new URL',
        this.selectedLink.getAttribute('href') || ''
      );
      if (url) {
        this.selectedLink.setAttribute('href', url);
      }
      this.hideLinkMenu();
    }
  }

  removeLink() {
    if (this.selectedLink) {
      while (this.selectedLink.firstChild) {
        this.selectedLink.parentNode!.insertBefore(
          this.selectedLink.firstChild,
          this.selectedLink
        );
      }
      this.selectedLink.remove();
      this.hideLinkMenu();
    }
  }

  /**
   * Image Pick or Url Manage
   * onImageUpload()
   * insertImageUrl()
   * applyResponsiveImageStyles()
   */
  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = document.createElement('img');
        img.src = e.target!.result as string;
        this.applyResponsiveImageStyles(img);
        img.contentEditable = 'false';
        img.addEventListener('click', (ev) => {
          ev.stopPropagation(); // Prevent event from bubbling up to document
          this.selectedImage = img;
          this.showImageResizeController(img);
          this.showImageBasicController(img);
        });
        img.setAttribute('data-listener-added', 'true');
        this.editor.nativeElement.appendChild(img);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  insertImageUrl(url: string) {
    if (url) {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);

      // Create an img element with the provided URL
      const img = document.createElement('img');
      console.log('img', img);
      img.src = url;
      this.applyResponsiveImageStyles(img);
      img.contentEditable = 'false';

      // Add event listener for selecting the image
      img.addEventListener('click', (ev) => {
        ev.stopPropagation(); // Prevent event from bubbling up to document
        this.selectedImage = img;
        this.showImageResizeController(img);
        this.showImageBasicController(img);
      });
      img.setAttribute('data-listener-added', 'true');

      // Insert the image at the current cursor position
      range.deleteContents(); // Remove the selected text, if any
      range.insertNode(img);

      // Move the caret after the inserted image
      range.setStartAfter(img);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /**
   * Apply responsive styles to images
   * This method ensures images are mobile responsive while preserving alignment
   */
  private applyResponsiveImageStyles(
    img: HTMLImageElement,
    preserveAlignment: boolean = false
  ) {
    // Check if image has existing alignment before removing styles
    const computedStyle = window.getComputedStyle(img);
    const existingFloat = img.style.float || computedStyle.float;
    const existingDisplay = img.style.display || computedStyle.display;
    const isLeftAligned = existingFloat === 'left';
    const isRightAligned = existingFloat === 'right';
    const isCentered =
      existingDisplay === 'block' &&
      (img.style.margin || computedStyle.margin).includes('auto');

    if (!preserveAlignment) {
      // Remove any conflicting inline styles first (only if not preserving alignment)
      img.removeAttribute('style');
    }

    // Apply responsive styles with strong specificity
    img.style.setProperty('max-width', '100%', 'important');
    img.style.setProperty('height', 'auto', 'important');
    img.style.setProperty('box-sizing', 'border-box', 'important');
    img.style.setProperty('position', 'relative', 'important');
    img.style.setProperty('object-fit', 'contain', 'important');

    // Remove width attribute to prevent fixed widths on mobile
    img.removeAttribute('width');
    img.removeAttribute('height');

    // Preserve alignment if it was explicitly set (for pasted images)
    if (preserveAlignment && (isLeftAligned || isRightAligned)) {
      if (isLeftAligned) {
        img.style.setProperty('display', 'inline', 'important');
        img.style.setProperty('float', 'left', 'important');
        img.style.setProperty('margin', '10px 10px 10px 0', 'important');
      } else if (isRightAligned) {
        img.style.setProperty('display', 'inline', 'important');
        img.style.setProperty('float', 'right', 'important');
        img.style.setProperty('margin', '10px 0 10px 10px', 'important');
      }
    } else if (
      !preserveAlignment ||
      (!isLeftAligned && !isRightAligned && !isCentered)
    ) {
      // Default: center aligned and responsive
      img.style.setProperty('display', 'block', 'important');
      img.style.setProperty('margin', '10px auto', 'important');
      img.style.setProperty('width', 'auto', 'important');
      img.style.setProperty('float', 'none', 'important');
    }

    // Add responsive class for additional CSS control
    img.classList.add('responsive-image');

    // Add loading attribute for better performance
    img.loading = 'lazy';

    // Add alt attribute for accessibility
    if (!img.alt) {
      img.alt = 'Image';
    }

    // Force reflow to ensure styles are applied
    img.offsetHeight;
  }

  /**
   * Make existing images responsive
   * This method is called when content is loaded to ensure all images are responsive
   * But preserves user-set widths and alignments
   */
  private makeExistingImagesResponsive() {
    if (!this.editor?.nativeElement) return;

    const images = this.editor.nativeElement.querySelectorAll('img');
    images.forEach((img: HTMLImageElement) => {
      // Check if image already has width set by user (resize)
      const hasCustomWidth =
        img.style.width &&
        img.style.width !== 'auto' &&
        !img.style.width.includes('100%');
      const existingFloat = img.style.float || '';
      const isLeftAligned = existingFloat === 'left';
      const isRightAligned = existingFloat === 'right';

      // Only apply responsive styles if width not explicitly set
      if (!hasCustomWidth) {
        this.applyResponsiveImageStyles(img, isLeftAligned || isRightAligned);
      } else {
        // Preserve custom width but ensure max-width constraint
        img.style.setProperty('max-width', '100%', 'important');
        img.style.setProperty('height', 'auto', 'important');
        img.style.setProperty('box-sizing', 'border-box', 'important');
        img.style.setProperty('object-fit', 'contain', 'important');

        // Remove width/height attributes to prevent mobile issues
        const customWidth = img.style.width;
        if (customWidth && !customWidth.includes('%')) {
          // Keep custom width for desktop but ensure mobile override
          img.setAttribute('data-original-width', customWidth);
        }
        img.removeAttribute('width');
        img.removeAttribute('height');

        // Preserve alignment
        if (isLeftAligned) {
          img.style.setProperty('float', 'left', 'important');
          img.style.setProperty('display', 'inline', 'important');
        } else if (isRightAligned) {
          img.style.setProperty('float', 'right', 'important');
          img.style.setProperty('display', 'inline', 'important');
        }

        // Ensure responsive class exists
        img.classList.add('responsive-image');
      }

      // Ensure contentEditable is false but image is still clickable
      img.contentEditable = 'false';

      // Re-add click listener if not present
      if (!img.hasAttribute('data-listener-added')) {
        img.addEventListener(
          'click',
          (ev: MouseEvent) => {
            ev.stopPropagation();
            ev.preventDefault();
            this.selectedImage = img;
            this.showImageResizeController(img);
            this.showImageBasicController(img);
          },
          true
        ); // Use capture phase
        img.setAttribute('data-listener-added', 'true');
      }
    });
  }

  /**
   * Image Control Methods
   * showImageBasicController()
   * showImageResizeController()
   * addImageClickListener()
   * onKeyDown()
   */
  showImageBasicController(img: HTMLElement) {
    const rect = img.getBoundingClientRect();
    const controller = this.imageControllerOtp.nativeElement;
    this.renderer.setStyle(controller, 'top', `${rect.top + window.scrollY}px`);
    this.renderer.setStyle(
      controller,
      'left',
      `${rect.right + window.scrollX + 10}px`
    );
    this.renderer.setStyle(controller, 'display', 'block');
  }

  showImageResizeController(img: HTMLElement) {
    const rect = img.getBoundingClientRect();
    const controller = this.imageController.nativeElement;
    this.renderer.setStyle(controller, 'top', `${rect.top + window.scrollY}px`);
    this.renderer.setStyle(
      controller,
      'left',
      `${rect.left + window.scrollX}px`
    );
    this.renderer.setStyle(controller, 'width', `${rect.width}px`);
    this.renderer.setStyle(controller, 'height', `${rect.height}px`);
    this.renderer.setStyle(controller, 'display', 'block');
    if (img.tagName === 'IFRAME') {
      this.selectedImage = img as HTMLImageElement;
    }
  }

  addImageClickListener() {
    if (!this.editor?.nativeElement) return;

    const images = this.editor.nativeElement.querySelectorAll('img');
    images.forEach((img: HTMLImageElement) => {
      // Ensure contentEditable is false but image is still clickable
      img.contentEditable = 'false';

      // Remove any existing listeners by checking the attribute
      if (!img.hasAttribute('data-listener-added')) {
        // Add click listener with proper event handling
        img.addEventListener(
          'click',
          (event: MouseEvent) => {
            event.stopPropagation();
            event.preventDefault();
            this.selectedImage = img;
            this.showImageResizeController(img);
            this.showImageBasicController(img);
          },
          true
        ); // Use capture phase to ensure it fires

        img.setAttribute('data-listener-added', 'true');
      }
    });
  }

  onKeyDown(event: KeyboardEvent) {
    if (
      (event.key === 'Delete' || event.key === 'Backspace') &&
      this.selectedImage
    ) {
      // Remove the selected image
      this.selectedImage.remove();
      this.selectedImage = null; // Reset the selected image after deletion

      // Hide the imageController and imageControllerOtp elements
      this.renderer.setStyle(
        this.imageController.nativeElement,
        'display',
        'none'
      );
      this.renderer.setStyle(
        this.imageControllerOtp.nativeElement,
        'display',
        'none'
      );

      event.preventDefault(); // Prevent the default behavior
    }
  }

  /**
   * Basic Image Control Methods
   * resizeImage()
   * alignImage()
   * deleteImage()
   */
  resizeImage() {
    if (this.selectedImage) {
      const img = this.selectedImage as HTMLImageElement;
      // Get current width to show in prompt
      const currentWidth =
        img.style.width || img.getAttribute('width') || '100%';
      const size = prompt(
        'Enter the new width (px or %):',
        currentWidth.toString()
      );
      if (size) {
        // Preserve existing alignment
        const existingFloat = img.style.float || '';
        const isLeftAligned = existingFloat === 'left';
        const isRightAligned = existingFloat === 'right';
        const isCentered = !isLeftAligned && !isRightAligned;

        // Apply new width
        img.style.setProperty('width', size, 'important');

        // Maintain responsive constraint
        if (size.includes('%')) {
          img.style.setProperty('max-width', '100%', 'important');
        } else {
          // For pixel values, ensure it doesn't exceed container
          img.style.setProperty('max-width', '100%', 'important');
        }

        img.style.setProperty('height', 'auto', 'important');
        img.style.setProperty('box-sizing', 'border-box', 'important');

        // Preserve alignment
        if (isLeftAligned) {
          img.style.setProperty('display', 'inline', 'important');
          img.style.setProperty('float', 'left', 'important');
          img.style.setProperty('margin', '10px 10px 10px 0', 'important');
        } else if (isRightAligned) {
          img.style.setProperty('display', 'inline', 'important');
          img.style.setProperty('float', 'right', 'important');
          img.style.setProperty('margin', '10px 0 10px 10px', 'important');
        } else {
          img.style.setProperty('display', 'block', 'important');
          img.style.setProperty('margin', '10px auto', 'important');
          img.style.setProperty('float', 'none', 'important');
        }

        // Update resize controller to match new size
        this.showImageResizeController(this.selectedImage);
        this.showImageBasicController(this.selectedImage);
      }
    }
    this.onEditorContentChange();
  }

  alignImage(alignment: string) {
    if (this.selectedImage) {
      const img = this.selectedImage as HTMLImageElement;

      // Remove conflicting styles first
      img.style.removeProperty('margin');
      img.style.removeProperty('float');
      img.style.removeProperty('position');

      switch (alignment) {
        case 'left':
          img.style.setProperty('display', 'inline', 'important');
          img.style.setProperty('float', 'left', 'important');
          img.style.setProperty('max-width', '100%', 'important');
          img.style.setProperty('margin', '10px 10px 10px 0', 'important');
          break;
        case 'right':
          img.style.setProperty('display', 'inline', 'important');
          img.style.setProperty('float', 'right', 'important');
          img.style.setProperty('max-width', '100%', 'important');
          img.style.setProperty('margin', '10px 0 10px 10px', 'important');
          break;
        case 'center':
          img.style.setProperty('display', 'block', 'important');
          img.style.setProperty('margin', '10px auto', 'important');
          img.style.setProperty('float', 'none', 'important');
          img.style.setProperty('max-width', '100%', 'important');
          break;
      }

      this.showImageResizeController(this.selectedImage);
      this.showImageBasicController(this.selectedImage);
    }
    this.onEditorContentChange();
  }

  deleteImage() {
    if (this.selectedImage) {
      this.selectedImage.remove();
      this.selectedImage = null;
      this.renderer.setStyle(
        this.imageControllerOtp.nativeElement,
        'display',
        'none'
      );
    }
  }

  /**
   * Resize like Photoshop
   * onResizeStart()
   * onResizing()
   * onResizeEnd()
   */
  onResizeStart(event: MouseEvent, handle: string) {
    if (!this.selectedImage) return;

    // Clean up any existing listeners first
    if (this.resizeMouseMoveListener) {
      this.resizeMouseMoveListener();
      this.resizeMouseMoveListener = null;
    }
    if (this.resizeMouseUpListener) {
      this.resizeMouseUpListener();
      this.resizeMouseUpListener = null;
    }

    this.resizeHandle = handle;
    this.initialMouseX = event.clientX;
    this.initialMouseY = event.clientY;
    this.initialImageWidth = this.selectedImage.offsetWidth;
    this.initialImageHeight = this.selectedImage.offsetHeight;

    // Store listener cleanup functions
    this.resizeMouseMoveListener = this.renderer.listen(
      'document',
      'mousemove',
      (e: MouseEvent) => {
        this.onResizing(e);
      }
    );

    this.resizeMouseUpListener = this.renderer.listen(
      'document',
      'mouseup',
      (e: MouseEvent) => {
        this.onResizeEnd(e);
      }
    );

    event.stopPropagation();
    event.preventDefault();
  }

  onResizing(event: MouseEvent) {
    if (!this.selectedImage || !this.resizeHandle) return;
    let deltaX = event.clientX - this.initialMouseX;
    let deltaY = event.clientY - this.initialMouseY;

    // Preserve existing alignment
    const img = this.selectedImage as HTMLImageElement;
    const existingFloat = img.style.float || '';
    const isLeftAligned = existingFloat === 'left';
    const isRightAligned = existingFloat === 'right';

    // Calculate new dimensions
    let newWidth = 0;
    let newHeight = 0;

    switch (this.resizeHandle) {
      case 'top-left':
        newWidth = Math.max(50, this.initialImageWidth - deltaX); // Min 50px
        newHeight = Math.max(50, this.initialImageHeight - deltaY);
        break;
      case 'top-right':
        newWidth = Math.max(50, this.initialImageWidth + deltaX);
        newHeight = Math.max(50, this.initialImageHeight - deltaY);
        break;
      case 'bottom-left':
        newWidth = Math.max(50, this.initialImageWidth - deltaX);
        newHeight = Math.max(50, this.initialImageHeight + deltaY);
        break;
      case 'bottom-right':
        newWidth = Math.max(50, this.initialImageWidth + deltaX);
        newHeight = Math.max(50, this.initialImageHeight + deltaY);
        break;
    }

    // Apply new size
    img.style.setProperty('width', `${newWidth}px`, 'important');
    img.style.setProperty('height', `${newHeight}px`, 'important');
    img.style.setProperty('max-width', '100%', 'important');
    img.style.setProperty('box-sizing', 'border-box', 'important');

    // Preserve alignment
    if (isLeftAligned) {
      img.style.setProperty('display', 'inline', 'important');
      img.style.setProperty('float', 'left', 'important');
      img.style.setProperty('margin', '10px 10px 10px 0', 'important');
    } else if (isRightAligned) {
      img.style.setProperty('display', 'inline', 'important');
      img.style.setProperty('float', 'right', 'important');
      img.style.setProperty('margin', '10px 0 10px 10px', 'important');
    } else {
      img.style.setProperty('display', 'block', 'important');
      img.style.setProperty('margin', '10px auto', 'important');
      img.style.setProperty('float', 'none', 'important');
    }

    this.showImageResizeController(this.selectedImage);
    this.showImageBasicController(this.selectedImage);
    this.onEditorContentChange();
  }

  onResizeEnd(event: MouseEvent) {
    // Clean up listeners
    if (this.resizeMouseMoveListener) {
      this.resizeMouseMoveListener();
      this.resizeMouseMoveListener = null;
    }
    if (this.resizeMouseUpListener) {
      this.resizeMouseUpListener();
      this.resizeMouseUpListener = null;
    }

    this.resizeHandle = null;

    // Update controllers after resize
    if (this.selectedImage) {
      this.showImageResizeController(this.selectedImage);
      this.showImageBasicController(this.selectedImage);
    }
  }

  onScroll(event: WheelEvent) {
    if (event.deltaY > 0) {
      this.onDocumentClick(event);
      // event.preventDefault();
      // console.log('Scrolled down');
    } else {
      this.onDocumentClick(event);
      // event.preventDefault();
      // console.log('Scrolled up');
    }
  }

  /**
   * On Document Control
   * onDocumentClick()
   */
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    // If clicking on an image, don't hide controllers - let onEditorClick handle it
    if (target.tagName === 'IMG') {
      return; // Let the image click handler in onEditorClick or addImageClickListener handle it
    }

    // If the clicked target is not an image, deselect the image
    this.selectedImage = null;

    const controller = this.imageController.nativeElement;
    // Only hide if click is outside both the image and the controller
    if (
      !controller.contains(event.target as Node) &&
      target.tagName !== 'IMG'
    ) {
      this.renderer.setStyle(controller, 'display', 'none');
      this.selectedImage = null;
    }

    const controllerOpt = this.imageControllerOtp.nativeElement;
    // Only hide if click is outside both the image and the controller
    if (
      !controllerOpt.contains(event.target as Node) &&
      target.tagName !== 'IMG'
    ) {
      this.renderer.setStyle(controllerOpt, 'display', 'none');
      this.selectedImage = null;
    }

    if (
      !this.editor.nativeElement.contains(event.target as Node) &&
      !this.linkMenu.nativeElement.contains(event.target as Node)
    ) {
      this.hideLinkMenu();
    }

    if (
      !this.colorPickerDropdown.nativeElement.contains(event.target as Node) &&
      !(event.target as HTMLElement).classList.contains('color-picker-toggle')
    ) {
      this.hideColorPickers();
    }
  }

  /**
   * Active Style
   * checkActiveTextStyle()
   */
  checkActiveTextStyle(command: string) {
    return this.currentTextStyle.includes(command);
  }

  /**
   * COMPONENT DIALOG
   * openGalleryDialog
   */

  public openGalleryDialog() {
    const dialogRef = this.dialog.open(MyGalleryComponent, {
      data: { type: 'single', count: 1 },
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          const image: Gallery = dialogResult.data[0] as Gallery;
          this.insertImageUrl(image.url);
        }
      }
    });
  }

  /**
   * Adjust Auto changes with any Form Control
   * writeValue()
   * registerOnChange()
   * registerOnTouched()
   * setDisabledState()
   * onEditorContentChange()
   */

  writeValue(value: string): void {
    if (this.editor) {
      this.editor.nativeElement.innerHTML = value || '';

      // Use multiple timeouts to ensure proper initialization
      setTimeout(() => {
        this.addImageClickListener();
        this.makeExistingImagesResponsive();
      }, 100);

      setTimeout(() => {
        this.makeExistingImagesResponsive();
      }, 300);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.editor.nativeElement.contentEditable = !isDisabled;
  }

  private onEditorContentChange(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const content = this.editor.nativeElement.innerHTML;
    if (this.onChange) {
      this.onChange(content);
    }
    if (this.onTouched) {
      this.onTouched();
    }

    // Check for new images and make them responsive
    // Use longer delay to avoid resetting user-applied resize
    setTimeout(() => {
      this.makeExistingImagesResponsive();
      // Ensure click listeners are attached
      this.addImageClickListener();
    }, 100);
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.observer.disconnect();

    // Clean up resize listeners
    if (this.resizeMouseMoveListener) {
      this.resizeMouseMoveListener();
      this.resizeMouseMoveListener = null;
    }
    if (this.resizeMouseUpListener) {
      this.resizeMouseUpListener();
      this.resizeMouseUpListener = null;
    }
  }
}
