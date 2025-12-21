import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
  standalone: true
})
export class ThemeSelectorComponent implements OnInit {
  selectedTheme: any;
  themeSelected: any;

  constructor(private dialogRef: MatDialogRef<ThemeSelectorComponent>) {

  }

  ngOnInit() {
    this.templateData();
  }

  saveTemplate() {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }


  private templateData() {
    this.themeSelected = [
      {
        _id:'5674567546',
        image: '/assets/page/34.webp',
        name: 'Natural Powder',
        link: '/assets/page/landing-page2.html',
        theme: `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Page</title>
    <style>

              .section1 {
            background-color: #013220;
            color: white;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
              }
        .theme-container{
            max-width: 1200px;
            margin: 0 auto;
            padding: 60px 20px;
            text-align: center;
        }

        .section1 .content-box {
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .section1 .highlight {
            color: #ffcc00;
        }

        .section1 .button {
            background-color: #ffcc00;
            color: #013220;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
        }
       .section1 .button:hover {
            background-color: #e6b800;
        }
        .section1 .video-container {
            position: relative;
            border: 6px solid #28a745;
            border-radius: 10px;
            overflow: hidden;
        }
        .section1 .video-container iframe {
            width: 100%;
            height: 400px;
        }
        .section1 .play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            animation: pulse 2s infinite;
        }
        .section1 .play-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            border: 2px solid rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        .section1 .play-button svg {
            width: 36px;
            height: 36px;
            fill: #013220;
        }
        @keyframes pulse {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0;
            }
        }
        @media (max-width: 768px) {
            .section1 .video-container iframe {
                height: 200px;
            }
        }
        .section1 .border-box {
            border: 2px solid #01632a;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
  .section2 {
         display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
             padding: 60px 20px;
  }
      .section2 .container1 {
            background-color: #218838;
            padding: 60px 20px;
            border-radius: 10px;
            max-width:1200px;
            width:100%;
            margin: 0;
            text-align: center;
        }

.section2 .header {
            background-color:rgb(243, 19, 41);
            color: white;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .section2 .header span {
            font-weight: bold;
        }
        .section2 .content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;

        }
        .section2 .content p {
            color: #28a745;
            margin: 0;
        }
        .section2 .content p.line-through {
            text-decoration: line-through;
            margin-bottom: 10px;
        }
        .section2 .button-container {
            display: flex;
            justify-content: center;
        }
        .section2 .button-container a {
            background-color: #fd7e14;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .section2 .button-container button:hover {
            background-color: #e67e22;
        }


 .section3{
      display: flex;
            align-items: center;
            justify-content: center;
            background-color: #28a745;
            margin: 0;
 }

 .section3 {
     background-color: #f0f9e8;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;

 }
 .section3 .container3 {
            padding: 60px 20px;
            border-radius: 10px;
            max-width: 1000px;
            width: 100%;
        }
        .section3 .grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
        }
        @media (min-width: 768px) {
             .section3 .grid {
                grid-template-columns: 1fr 1fr;
            }
        }
         .section3 .box {
            background-color: white;
            border: 4px solid #2f9e44;
            border-radius: 10px;
            padding: 20px;
        }
         .section3 .box h2 {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }
         .section3 .box ul {
            list-style-type: none;
            padding: 0;
        }
         .section3 .box ul li {
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
        }
         .section3 .button-container {
            text-align: center;
            margin-top: 20px;
        }
         .section3 .button-container a {
            background-color: #ff922b;
            color: white;
            font-size: 18px;
            font-weight: bold;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
         .section3 .button-container button:hover {
            background-color: #e07b24;
        }

 .section4{
    background-color: #013220;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
 }
   .section4 .container4 {
            text-align: center;
            padding: 60px 20px;
        }
         .section4 .header {
            background-color: #2E8B57;
            border: 4px solid #00FF00;
            border-radius: 8px;
            display: inline-block;
            padding: 10px 20px;
            margin-bottom: 20px;
        }
         .section4  .header h1 {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }
         .section4 .content p {
            margin: 10px 0;
        }
         .section4 .button {
            background-color: #FFA500;
            color: white;
            font-weight: bold;
            padding: 10px 20px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 20px;
        }
         .section4 .button:hover {
            background-color: #FF8C00;
        }

         .section5{
             background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
         }

 .section5 .container5 {
      padding: 60px 20px;
            border-radius: 10px;
            max-width: 1000px;
            width: 100%;
            text-align: center;
        }
        .section5 .title {
            font-size: 1.5rem;
            border-radius: 5px;
            font-weight: bold;
            color: #006400;
            border: 2px solid #006400;
            display: inline-block;
            padding: 10px 20px;
            margin-bottom: 20px!important;
        }
        .section5 .grid {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: max-content;
            gap: 10px;
            align-items: center;
            margin-bottom: 20px;
        }
        @media (min-width: 768px) {
            .section5 .grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        .section5 .grid-item {
            border: 2px solid #006400;
            padding: 20px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
        }


        .section5 .button {
            background-color: #FFA500;
            color: white;
            font-weight: bold;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .section5 .button:hover {
            background-color: #FF8C00;
        }

         .section6 {
             display: flex;
            align-items: center;
            justify-content: center;
             background-color:rgb(255, 255, 255);
         }

 .section6 .container6 {
            border: 4px dotted #16a34a;
            padding: 60px 20px;
            border-radius: 10px;
            max-width: 1000px;
            text-align: center;
 }
            .section6 .title {
            color: #15803d;
            font-size: 1.5rem;
            font-weight: bold;
        }
         .section6 .subtitle {
            color: #15803d;
        }
         .section6 .offer {
            background-color: #dc2626;
            color: white;
            padding: 16px;
            margin-top: 16px;
            border-radius: 8px;
        }
         .section6 .offer p {
            margin: 0;
        }
         .section6 .offer .highlight {
            font-size: 1.25rem;
            font-weight: bold;
            margin-top: 8px;
        }

 </style>
</head>
<body>
    <div class="section1">
    <div class="theme-container">
        <div class="border-box">
            <p class="text-2xl" >
                প্রতিদিন ১ গ্রাম সজনে পাতার জুস আপনাকে ও আপনার পরিবারকে <span class="highlight">৩০০টি রোগ</span> থেকে রক্ষা করবে যা গবেষণায় পরীক্ষিত !!
            </p>
        </div>
        <div class="content-box">
            <p class="text-lg" >
                ৫৫ গ্রাম প্রিমিয়াম সজিনা পাউডার + ১০০ গ্রাম কালোজিরা মধু ফ্রি।
            </p>
            <a id="link" href="#payment" class="link button">অর্ডার করতে ক্লিক করুন</a>
        </div>
        <div class="video-container">
            <iframe id="video" src="https://www.youtube.com/embed/0IHfyRidDlE" frameborder="0" allowfullscreen></iframe>
<!--            <div class="play-button">-->
<!--                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">-->
<!--                    <path d="M8 5v14l11-7z"/>-->
<!--                </svg>-->
<!--            </div>-->
        </div>
    </div>
    </div>
     <div class="section2">
<div class="container1">
        <div class="header" >
            আমাদের থেকে বিস্তারিত জানতে এই নাম্বারে কল করুন <span>1234567890</span>
        </div>
        <div class="content">
            <p class="line-through" >৪০০ গ্রাম সজিনা পাতার পাউডারের রেগুলার প্রাইস- ১৫০০/=</p>
            <p >৪০০ গ্রাম সজিনা পাতার পাউডারের অফার প্রাইস- ১০৫০/=</p>
        </div>
        <div class="button-container">
              <a id="link" href="#payment" class="link button">অর্ডার করতে ক্লিক করুন</a>
        </div>
    </div>
    </div>

<div class="section3">
<div class="container3">
        <div class="grid">
            <div class="box">
                <h2 >সজিনা পাতার উপকারিতা</h2>
                <ul>
                    <li  >উচ্চ রক্তচাপ নিয়ন্ত্রণে রাখে।</li>
                    <li >এটি এন্টি-ব্যাকটেরিয়াল বৈশিষ্ট্য বিদ্যমান। এটি ফ্লুতে ও কিডনী সুস্থ রাখতে এবং রক্তের সেলেনিয়াম বৃদ্ধি করতে সাহায্য করে।</li>
                    <li  >রক্তে কোলেস্টেরল কমায়।</li>
                    <li   >এন্টিডিপ্রেসেন্ট বা গ্যাস্ট্রিক নিয়ন্ত্রণে রাখে।</li>
                    <li   >শরীরে কোলেস্টেরল এর মাত্রা নিয়ন্ত্রণেও অনন্য অবদান রাখে।</li>
                    <li   >রক্ত শর্করা দূর করে।</li>
                    <li   >মানুষের শরীরের যে ৯ টি এমাইনো এসিড খাদ্যের মাধ্যমে সরবরাহ করতে হয়, তার সবগুলোই এই সজিনা পাতা গুড়ার মধ্যে বিদ্যমান।</li>
                    <li   >শরীরে সুরক্ষার মাত্রা নিয়ন্ত্রণে রাখার জন্য অ্যান্টিঅক্সিডেন্ট মত কঠিন রোগের বিরুদ্ধে কাজ করে থাকে।</li>
                    <li   >চোখের জন্য উপকারী।</li>
                    <li   >ঠান্ডা জ্বরের সমস্যা দূর করে।</li>
                </ul>
            </div>
            <div class="box">
                <h2   >সেবনে সঠিক নিয়ম</h2>
                <ul>
                    <li   >খালি পেটে এক গ্লাস পানিতে ২ চা চামচ সজিনা পাতা মিশ্র করে খেতে পারেন।</li>
                    <li   >মধুর সাথে মিশ্র করে খেতে পারেন।</li>
                    <li   >দুধের সাথে মিশ্র করে খেতে পারেন।</li>
                    <li   >ডালের সাথে মিশ্র করে খেতে পারেন।</li>
                    <li   >বিভিন্ন ধরনের ভাজির সাথে মিশ্রিত খাওয়া যায়।</li>
                    <li   >পেয়ারার সাথে মিশ্র করে খেতে পারেন।</li>
                    <li   >আমড়ার সাথে মিশ্র করে খেতে পারেন।</li>
                    <li   >কাঁঠা আমের সাথে মিশ্রিত খেতে পারেন।</li>
                    <li   >তরকারির সাথে মিশ্র করে খেতে পারেন।</li>
                    <li   >চোখের জন্য উপকারী।</li>
                    <li   >ঠান্ডা জ্বরের সমস্যা দূর করে।</li>
                </ul>
            </div>
        </div>
        <div class="button-container">
             <a id="link" href="#payment" class="link button">অর্ডার করতে ক্লিক করুন</a>
        </div>
    </div>
      </div>

<div class="section4">
 <div class="container4">
        <div class="header">
            <h1   >আমাদের উপর কেন আস্থা রাখবেন ??</h1>
        </div>
        <div class="content">
            <p   >মূলানুসৃত শতভাগ হাইড্রোজেনিক মেইনটেইন করে, সম্পূর্ণ নিজস্ব তত্ত্বাবধানে প্রস্তুতকৃত প্রিমিয়াম সজিনা পাতা গুড়া</p>
            <p   >প্রোডাক্ট হাতে পেয়ে, দেখে, কোয়ালিটি চেক করে পেমেন্ট করার সুবিধা ।</p>
            <p   >সারা বাংলাদেশে কুরিয়ারের মাধ্যমে হোম ডেলিভারি পাবেন ।</p>
            <p   >যে কোন সময় আমাদের সাথে যোগাযোগ করতে পারবেন ।</p>
            <p   >অথবা এক টাকাও দিতে হবে না। ডেলিভারি ম্যান এর কাছ থেকে প্রোডাক্ট বুঝে পেয়ে তারপর টাকা দিবেন।</p>
        </div>
          <a id="link" href="#payment" class="link button">অর্ডার করতে ক্লিক করুন</a>
    </div>
 </div>

<div class="section5">
<div class="container5">
        <h1 class="title"   >এতকিছু থাকতে সজিনা পাতার গুড়া কেনা খাবেন ?</h1>
        <div class="grid">
            <div class="grid-item">
                <p   >শরীরের সুগারের মাত্রা নিয়ন্ত্রণের মাধ্যমে ডায়াবেটিসের মত কঠিন রোগের বিরুদ্ধে কাজ করে থাকে।</p>
            </div>
            <div class="grid-item">
                <p   >নিয়মিত সজিনার পাতা খেলে মুখে রুচি বাড়ে।</p>
            </div>
            <div class="grid-item">
                <p   >লিভার ও কিডনি সুস্থ রাখতে সহায়তা করে।</p>
            </div>
            <div class="grid-item">
                <p   >উচ্চ রক্ত চাপ নিয়ন্ত্রণে থাকে।</p>
            </div>
            <div class="grid-item">
                <p   >শরীরে ময়েশ্চারের ছাপ সহজে পড়ে না।</p>
            </div>
            <div class="grid-item">
                <p   >রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে।</p>
            </div>
            <div class="grid-item">
                <p   >ওজন কমানোর জন্য দারুণ সহায়ক হবে।</p>
            </div>
            <div class="grid-item">
                <p   >জ্বর,কাশি ও ঠান্ডা জনিত সমস্যা দূর করে।</p>
            </div>
        </div>
        <a  id="link" href="#payment" class="link button">অর্ডার করতে ক্লিক করুন</a>
    </div>
    </div>

<div class="section6">
 <div class="container6">
        <h1 class="title"   >মরিসা পাউডার প্রাইস</h1>
        <p class="subtitle"   >সাশ্রয়ী দামে সেরা পণ্য</p>
        <div class="offer">
            <p   >৫০০ গ্রাম মরিসা পাউডার এর পূর্ব মূল্যঃ ১২৫০ টাকা</p>
            <p class="highlight"   >১০৫০ টাকার প্যাকেজটি ৮৫০ টাকা অফারটি সীমিত সময়ের জন্য</p>
        </div>
    </div>
</div>

</body>
</html>`
      },

      {
        _id:'5674567546',
        image: '/assets/page/36.webp',
        name: 'Beauty',
        link: '/assets/page/landing-page.html',
        theme: `
        <html lang="en">
 <head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>
   Web Page Design
  </title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <style>
   body {
            font-family: Arial, sans-serif;
       margin: 0;
       padding: 0;
       box-sizing: border-box;
        }

        .section1 {
            background: #008037;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            padding: 30px 0 60px;
        }
        .section1 .theme-container {
            text-align: center;
            max-width: 800px;
            width: 100%;
            padding: 20px;
            /*margin: 0 15px;*/
            border-radius: 40px;
            background-color: hsla(0, 0%, 100%, .08);
            box-shadow: 0 20px 20px 0 rgba(0, 0, 0, .1);
            @media(max-width: 768px){
                width: 85%;
            }
        }
        .section1 .header {
            background-color: #fff1b7;
            color: #cc0000;
            font-weight: bold;
            font-size: 22px;
            padding: 15px;
            border-radius: 10px 10px 0 0;
            border: 8px solid #ffcc00;
        }
        .section1 .content {
            padding: 20px 5px;
        }
        .section1 .content p {
            color: #ffffff;
            margin-bottom: 20px;
        }
        .section1 .image-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }
        .section1 .image-container img {
            width: 200px;
            height: auto;
        }
        .section1 .price {
            padding-left: 10px;
            color: #ffffff;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 17px;
            margin-bottom: 20px;
            border-radius: 16px 0;
            border-width: 1px;
            border-style: solid;
            border-color: rgb(242, 211, 53);
            @media(max-width: 768px) {
                flex-direction: column;
                gap: 20px;
                padding: 15px 10px;
            }
        }
        .section1 .price span {
            text-align: right;
            background-color: #cc0000;
            color: #ffffff;
            text-wrap: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
            padding:10px;
            height: 100%;
            border-radius: 0 0 16px;
            @media(max-width: 768px) {
            border-radius: 5px;
            padding: 14px 25px;
            }
        }
        .btn-area{
        display: flex;
        justify-content: center;
        align-items: center;
        }
     .button {
            text-align: center;
            font-size: 20px;
            line-height: 45px;
            font-weight: 700;
            display: inline-block;
            width: auto;
            margin-top: 15px;
            box-shadow: rgba(0, 0, 0, 0.1) 0 20px 20px 0;
            background: linear-gradient(90deg, rgb(242, 211, 53) 0px, rgb(242, 211, 53) 51%, rgb(201, 172, 31)) 0% 0% / 200%;
            transition: 0.5s;
            padding: 5px 15px;
            border-radius: 10px;
            border-width: 3px;
            border-style: solid;
            border-color: rgb(242, 68, 29);
            border-image: initial;
            text-wrap: nowrap;
            text-decoration: none;
        }

        /*.section3 {*/
        /*    margin: 60px 0;*/
        /*}*/

        .section3{
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 60px 15px;
        }

        .section3 .header {
            background-color: #E6F4EA;
            border: 2px solid #38A169;
            border-radius: 8px;
            padding: 16px;
            text-align: center;
            margin-bottom: 24px;
        }
        .section3 .header h1 {
            color: #E53E3E;
            font-size: 1.25rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            @media(max-width: 768px) {
                font-size: 1rem;
            }
        }
        .section3 .header h1 i {
            margin: 0 8px;
        }
        .section3 .content {
            background-color: white;
            border-radius: 8px;
            padding: 24px;
            /*margin-bottom: 24px;*/
            max-width: 1024px;
            margin: 0 auto;
            @media(max-width: 768px) {
                padding: 0;
            }
        }
        .section3 .grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
            text-align: center;
        }
        @media (min-width: 768px) {
            .section3 .grid {
                grid-template-columns: 1fr 1fr;
                text-align: start;
            }
        }
        .section3 .grid div {
            border: 1px solid #E2E8F0;
            padding: 16px;
        }
        .section3 .btn-container{
            text-align: center;
            display: flex;
            justify-content: center;
        }

        .section3 .footer {
            color: #E53E3E;
            text-align: center;
        }

        .section6 {
            margin: 60px 0;
        }

        .section6 .container {
            background-color: #1b5e20;
            color: white;
            border-radius: 10px;
            padding: 20px;
            width: 90%;
            margin: 0 auto;
            max-width: 800px;
        }
        .section6  .header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }
        .section6  .header i {
            color: #ff5722;
            margin-right: 10px;
        }
        .section6 .header h1 {
            font-size: 1.5rem;
            font-weight: bold;
        }
        .section6  .content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
        }
        .section6  .content div {
            display: flex;
            align-items: center;
        }
        .section6  .content i {
            color: #4caf50;
            margin-right: 10px;
        }
        @media (max-width: 768px) {
            .section6 .header {
                flex-direction: column;
                text-align: center;
            }
            .section6 .header i {
                font-size: 40px;
            }
        }
        @media (min-width: 768px) {
            .section6 .content {
                grid-template-columns: 1fr 1fr;
            }
        }

        .section7 {
            margin: 60px 0!important;
            padding-bottom: 35px;
        }
   .section7 .container {
       color: white;
       border-radius: 10px;
       width: 90%;
       margin: 0 auto;
       max-width: 800px;
   }

        .section7 .offer-container {
            margin: 0 auto;
            background-color: #d1fae5;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            width: 100%;
            @media(max-width: 768px) {
                padding: 20px 0;
            }
        }
        .section7 .offer-container p {
            color: #065f46;
            margin-bottom: 16px;
            font-size: 16px;
        }
        .section7 .offer-container .regular-price {
            color: #dc2626;
            font-size: 24px;
            font-weight: bold;
            text-decoration: line-through;
            margin-bottom: 8px;
        }
        .section7 .offer-container .offer-price {
            color: #065f46;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 16px;
            @media(max-width: 768px) {
                font-size: 20px;
            }
        }
        .section7 .offer-container .contact-button {
            background-color: #f97316;
            color: white;
            padding: 10px 20px;
            border-radius: 9999px;
            font-size: 15px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            @media(max-width: 768px) {
                padding: 10px 20px;
                width: 80%;
            }
        }
        .section7 .offer-container .contact-button i {
            margin-right: 8px;
        }


        .section4 .container1 {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .section4 .video-section {
            margin-bottom: 20px;
        }
        .section4 .info-offer-section {
            background-color: #4CAF50;
            color: #FFD700;
            text-align: center;
            padding: 20px;
            border-radius: 10px;
            border: 4px solid #006400;
            margin-bottom: 20px;
        }
        .section4 .info-offer-section p {
            margin: 10px 0;
            font-size: 1.2em;
            font-weight: bold;
        }
        .section4 .offer-box {
            background-color: #C8E6C9;
            color: #2E7D32;
            padding: 20px;
            border-radius: 10px;
            border: 4px solid #4CAF50;
            display: inline-block;
        }
        .section4 .offer-box span {
            background-color: #FF5722;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            margin-left: 10px;
            @media (max-width: 768px) {
                display: block;
                margin-top: 14px;
            }
        }

        .swing {
          transform-origin: top center!important;
          animation-name: swing!important;
          animation-duration: 1.25s!important;
          display: inline-block;
        }
        @keyframes swing {
          20% {
            transform: rotate3d(0, 0, 1, 15deg);
          }
          40% {
            transform: rotate3d(0, 0, 1, -10deg);
          }
          60% {
            transform: rotate3d(0, 0, 1, 5deg);
          }
          80% {
            transform: rotate3d(0, 0, 1, -5deg);
          }
          to {
            transform: rotate3d(0, 0, 1, 0deg);
          }
        }

  </style>
 </head>
 <body>
  <div class="section1">
    <div class="theme-container">
        <div class="header">
         ঔষধ ছাড়া ন্যাচারালি গ্যাস্ট্রিক নিয়ন্ত্রণ করুন
        </div>
        <div class="content">
         <p>
          দীর্ঘ ১০বছর ইউরোপ এবং আমেরিকার চিকিৎসক দ্বারা পরিক্ষিত। এখন পর্যন্ত অনলাইনে প্রায় ৮০০০+ মানুষের এর মাধ্যমে উপকার হয়েছে।
         </p>
         <div class="image-container">
          <img #imageElement (click)="openModal()"  id="image" class="swing" alt="product image" height="300" src="https://storage.googleapis.com/a1aa/image/hGWOwM92DsOoO1L3YyFbyOR2XfXsgGkpv1jOMhTpUFg.jpg" width="200"/>
<!--          <input class="ignore" type="file" accept="image/*" />-->
         </div>
         <div class="price">
          এখনি অর্ডার করলে পাচ্ছেন ১১০০ টাকার প্যাকেজ
          <span>
           এখন ৯৫০ টাকা
          </span>
         </div>
         <p>
          এই অফারটি গ্রহণ করুন গ্যরান্টি ১০০০ টাকার মধ্যে গ্যাস্ট্রিক থেকে মুক্তি
         </p>
             <div class="btn-area">
             <a class="link button" id="link" href="#payment">অর্ডার করতে ক্লিক করুন</a>
            </div>
        </div>
       </div>
  </div>

  <div class="section4">
    <div class="container1">
        <!-- Video Section -->
        <div class="video-section">
            <iframe id="video" class="w-full h-64 md:h-96" width="100%" height="400" src="https://www.youtube.com/embed/0IHfyRidDlE" title="Funnel Liner Logo Launching Video | The First Automated E Commerce Sales Funnel in Bangladesh." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        </div>

        <!-- Info and Offer Section -->
        <div class="info-offer-section">
            <p><i class="fas fa-phone-alt"></i> আরও কোন প্রশ্ন থাকলে কল করুন</p>
            <div class="offer-box">
                <p>এখনি অর্ডার করলে পাচ্ছেন ১১০০ টাকার প্যাকেজ <span>মাত্র ৯৫০ টাকা</span></p>
            </div>
        </div>

        <!-- Order Button -->
       <div class="btn-area">
             <a class="link button" id="link" href="#payment">অর্ডার করতে ক্লিক করুন</a>
            </div>
    </div>
  </div>

  <div class="section3">
      <div class="container1">
    <div class="header">
        <h1>
             কেন আপনি গ্যাস ক্লিয়ার পাউডার সেবন করবেন ?
        </h1>
    </div>
    <div class="content">
        <div class="grid">
            <div>
                <p>১০০% প্রাকৃতিক উপাদান গ্যাসট্রিক নিরাময়ে প্রাকৃতিক ভাবে ইনশাআল্লাহ</p>
            </div>
            <div>
                <p>এটি ফুল কোর্স আসা সেবন করায় গ্যাসট্রিক সমস্যার আর ফিরে আসার ভয় থাকে না।</p>
            </div>
            <div>
                <p>এটি গ্যাস ক্লিয়ার পাউডার, ল্যাবটেষ্ট করা, কোন প্রকার সাইড ইফেক্ট নেই। গ্যাসট্রিক, বুক জ্বালা, বমি, পেট ফাঁপা দূর করে।</p>
            </div>
            <div>
                <p>এটি সেবনে কোন পার্শ্বপ্রতিক্রিয়া নেই।</p>
            </div>
            <div>
                <p>এটি গ্যাস ক্লিয়ার পাউডার সেবনে গ্যাসট্রিক নিরাময়ে ক্ষতিগ্রস্ত কোষ পুনরায় তৈরি হয়।</p>
            </div>
            <div>
                <p>এটি পাকস্থলী এবং শরীরের অন্যান্য অঙ্গকে শক্তিশালী করে।</p>
            </div>
        </div>
    </div>
               <div class="btn-area">
             <a class="link button" id="link" href="#payment">অর্ডার করতে ক্লিক করুন</a>
            </div>
    <p class="footer">
        উপাদান সমূহঃ আমলকি, হরিতকি, বহেড়া, সোনাপাতা, মেথি, শিমুল মূল, বিট লবন সহ ১০ টি ভেষজ উপাদান
    </p>
  </div>
  </div>


  <div class="section6">
    <div class="container">
        <div class="header">
            <i class="fas fa-fire"></i>
            <h1>কেনো আপনি গ্যাস ক্লিয়ার পাউডার সেবন করবেন ?</h1>
        </div>
        <div class="content">
            <div>
                <i class="fas fa-check"></i>
                <p>৩-৫ ঘন্টার ভিতরে গ্যাঁস-ফাঁপ থেকে মুক্তি পাবেন।</p>
            </div>
            <div>
                <i class="fas fa-check"></i>
                <p>খাওয়ার রুচি বাড়াবে।</p>
            </div>
            <div>
                <i class="fas fa-check"></i>
                <p>এটি পেটের এসিড নিয়ন্ত্রণ করে হজমশক্তি বৃদ্ধি করে।</p>
            </div>
            <div>
                <i class="fas fa-check"></i>
                <p>বমি বমি ভাব দূর হবে</p>
            </div>
        </div>
    </div>
  </div>

  <div class="section7">
      <div class="container">
    <div class="offer-container">
        <p>
            গ্যাস্ট্রিক-কের মত অসস্থিকর রোগ থেকে নিজে ও পরিবারকে মুক্ত রাখতে আজই অর্ডার করুন। প্রোডাক্ট হাতে পেয়ে মূল্য পরিশোধ করতে পারবেন। তাই নিশ্চিন্তে অর্ডার করতে পারেন।
        </p>
        <p class="regular-price">১ফাইল-রেগুলার মূল্য-৯৯০/-টাকা</p>
        <p class="offer-price">অফার মূল্য = ৮৫০/-টাকা (ডেলিভারী চার্জ ফ্রী)</p>
        <a id="phone" href="tel:+8801894844452" class="contact-button">
            <i class="fas fa-phone-alt"></i> আরও কোন প্রশ্ন থাকলে কল করুনঃ +8801894844452
        </a>
    </div>
      <div class="btn-area">
             <a class="link button" id="link" href="#payment">অর্ডার করতে ক্লিক করুন</a>
            </div>
      </div>
      </div>
 </body>
</html>
        `
      },
      {
        _id: '543543534',
        image: '/assets/page/page33.png',
        name: 'Natural Powder',
        link: '/assets/page/landing-page3.html',
        theme: `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>মুখাল্লাত আহমার</title>
  <style>
    body {
      /*text-align: center;*/
      /*color: white;*/
    }
    /* Dark Section */
    .dark-section {
      text-align: center;
      background-color: #0a2240;
      padding: 50px 20px;
    }
    /* Light Section */
    .light-section {
      text-align: center;
      background-color: #1e304d;
      color: #0a2240;
      padding: 50px 20px;
    }
    h1 {
      font-size: 30px;
      color: #ffcc00;
      position: relative;
      display: inline-block;
      margin-bottom: 25px!important;
    }
    h1::after {
      content: "";
      width: 80px;
      height: 3px;
      background: #ffcc00;
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
    h3 {
      font-size: 16px;
      margin-bottom: 20px;
      color: white;
    }
    .product-container {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }
    .product-box {
      border: 2px solid #ffcc00;
      border-radius: 10px;
      padding: 10px;
      background-color: #0a2240;
      display: inline-block;
    }
    .product-box img {
      width: 100%;
      max-width: 650px;
      border-radius: 10px;
    }
    h2 {
      font-size: 24px;
      margin-bottom: 20px!important;
      color: #ffcc00;
      position: relative;
      display: inline-block;
    }
    h2::after {
      content: "";
      width: 80px;
      height: 3px;
      background: #ffcc00;
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      max-width: 1000px;
      margin: auto auto 30px;
    }
    .feature-box {
      border: 1px solid #ffcc00;
      padding: 20px;
      border-radius: 8px;
      color:white;
      text-align: center;
    }
    .feature-box svg {
      width: 40px;
      fill: #FFB700;
      color: #FFB700;
      border-color: #FFB700;
      margin-bottom: 10px;
    }
    .button {
      display: inline-block;
      background-color: #ffcc00;
      color: #0a2240;
      border:3px solid #fff;
      padding: 12px 20px;
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      transition: 0.3s;
    }
    .button:hover {
      background-color: #e6b800;
    }
    /* Why Choose Us Section */
    .container-page3 {
      display: flex;
      flex-wrap: wrap;
      max-width: 900px;
      margin: 30px auto;
      border-radius: 10px;
      overflow: hidden;
      background-color: #0a2240;
    }
    .left {
      width: 50%;
    }
    .left img {
      width: 100%;
      height: auto;
    }
    .right {
      width: 50%;
      padding: 30px;
      background-color: #0a2240;
      color: white;
    }
    .right h2 {

      font-size: 22px;
      margin-bottom: 15px;
      color: #ffcc00;
    }
    .right ul {
      list-style: none;
      margin-bottom: 20px;
    }
    .right ul li {
      font-size: 16px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
    .right ul li::before {
      content: "✔";
      color: #ffcc00;
      font-weight: bold;
      margin-right: 10px;
    }
     /* Responsive Fix for Mobile */
        @media (max-width: 768px) {
            .container-page3 {
                flex-direction: column;
            }
            .left, .right {
                width: 100%;
            }
            .right {
                padding: 20px 0;
                text-align: center;
            }
            .right ul {
                padding-left: 0;
            }
        }
  </style>
</head>
<body>

<!-- Dark Section - Product Intro -->
<div class="dark-section">
  <h1>মুখাল্লাত আহমার</h1>
  <h3>লক্ষ টাকার বাতাসের ইউনিক মিষ্টি সৌরভ মুগ্ধ করুন সবাইকে</h3>

  <div class="product-container">
    <div class="product-box">
      <img id="image" src="https://storage.googleapis.com/a1aa/image/UxV7aLlJRqDox9_v5weVQ4X2Aj0CDIB1JSi5A3hJYlM.jpg" alt="Perfume Image">
    </div>
  </div>
  <a id="link" href="#payment" class="link button">অর্ডার করতে ক্লিক করুন</a>
</div>

<!-- Light Section - Features -->
<div class="light-section">
  <h2>মুখাল্লাত আহমার এর বৈশিষ্ট্য।</h2>

  <div class="features">
    <div class="feature-box">
      <svg aria-hidden="true" class="e-font-icon-svg e-fab-viadeo" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M276.2 150.5v.7C258.3 98.6 233.6 47.8 205.4 0c43.3 29.2 67 100 70.8 150.5zm32.7 121.7c7.6 18.2 11 37.5 11 57 0 77.7-57.8 141-137.8 139.4l3.8-.3c74.2-46.7 109.3-118.6 109.3-205.1 0-38.1-6.5-75.9-18.9-112 1 11.7 1 23.7 1 35.4 0 91.8-18.1 241.6-116.6 280C95 455.2 49.4 398 49.4 329.2c0-75.6 57.4-142.3 135.4-142.3 16.8 0 33.7 3.1 49.1 9.6 1.7-15.1 6.5-29.9 13.4-43.3-19.9-7.2-41.2-10.7-62.5-10.7-161.5 0-238.7 195.9-129.9 313.7 67.9 74.6 192 73.9 259.8 0 56.6-61.3 60.9-142.4 36.4-201-12.7 8-27.1 13.9-42.2 17zM418.1 11.7c-31 66.5-81.3 47.2-115.8 80.1-12.4 12-20.6 34-20.6 50.5 0 14.1 4.5 27.1 12 38.8 47.4-11 98.3-46 118.2-90.7-.7 5.5-4.8 14.4-7.2 19.2-20.3 35.7-64.6 65.6-99.7 84.9 14.8 14.4 33.7 25.8 55 25.8 79 0 110.1-134.6 58.1-208.6z"></path></svg>
      <p>জাফরান আর বাতাসের অদ্ভুত মিষ্টি ঘ্রাণ যে কাউকে মুগ্ধ করবে</p>
    </div>
    <div class="feature-box">
      <svg aria-hidden="true" class="e-font-icon-svg e-fab-viadeo" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M276.2 150.5v.7C258.3 98.6 233.6 47.8 205.4 0c43.3 29.2 67 100 70.8 150.5zm32.7 121.7c7.6 18.2 11 37.5 11 57 0 77.7-57.8 141-137.8 139.4l3.8-.3c74.2-46.7 109.3-118.6 109.3-205.1 0-38.1-6.5-75.9-18.9-112 1 11.7 1 23.7 1 35.4 0 91.8-18.1 241.6-116.6 280C95 455.2 49.4 398 49.4 329.2c0-75.6 57.4-142.3 135.4-142.3 16.8 0 33.7 3.1 49.1 9.6 1.7-15.1 6.5-29.9 13.4-43.3-19.9-7.2-41.2-10.7-62.5-10.7-161.5 0-238.7 195.9-129.9 313.7 67.9 74.6 192 73.9 259.8 0 56.6-61.3 60.9-142.4 36.4-201-12.7 8-27.1 13.9-42.2 17zM418.1 11.7c-31 66.5-81.3 47.2-115.8 80.1-12.4 12-20.6 34-20.6 50.5 0 14.1 4.5 27.1 12 38.8 47.4-11 98.3-46 118.2-90.7-.7 5.5-4.8 14.4-7.2 19.2-20.3 35.7-64.6 65.6-99.7 84.9 14.8 14.4 33.7 25.8 55 25.8 79 0 110.1-134.6 58.1-208.6z"></path></svg>
      <p>প্রিয়জনকে গিফট করার জন্য একটি অনন্য সুগন্ধি</p>
    </div>
    <div class="feature-box">
      <svg aria-hidden="true" class="e-font-icon-svg e-fab-viadeo" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M276.2 150.5v.7C258.3 98.6 233.6 47.8 205.4 0c43.3 29.2 67 100 70.8 150.5zm32.7 121.7c7.6 18.2 11 37.5 11 57 0 77.7-57.8 141-137.8 139.4l3.8-.3c74.2-46.7 109.3-118.6 109.3-205.1 0-38.1-6.5-75.9-18.9-112 1 11.7 1 23.7 1 35.4 0 91.8-18.1 241.6-116.6 280C95 455.2 49.4 398 49.4 329.2c0-75.6 57.4-142.3 135.4-142.3 16.8 0 33.7 3.1 49.1 9.6 1.7-15.1 6.5-29.9 13.4-43.3-19.9-7.2-41.2-10.7-62.5-10.7-161.5 0-238.7 195.9-129.9 313.7 67.9 74.6 192 73.9 259.8 0 56.6-61.3 60.9-142.4 36.4-201-12.7 8-27.1 13.9-42.2 17zM418.1 11.7c-31 66.5-81.3 47.2-115.8 80.1-12.4 12-20.6 34-20.6 50.5 0 14.1 4.5 27.1 12 38.8 47.4-11 98.3-46 118.2-90.7-.7 5.5-4.8 14.4-7.2 19.2-20.3 35.7-64.6 65.6-99.7 84.9 14.8 14.4 33.7 25.8 55 25.8 79 0 110.1-134.6 58.1-208.6z"></path></svg>
      <p>এই সুগন্ধি তাদের জন্য যারা প্রিয়জনের কমপ্লিমেন্ট চান</p>
    </div>
    <div class="feature-box">
      <svg aria-hidden="true" class="e-font-icon-svg e-fab-viadeo" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M276.2 150.5v.7C258.3 98.6 233.6 47.8 205.4 0c43.3 29.2 67 100 70.8 150.5zm32.7 121.7c7.6 18.2 11 37.5 11 57 0 77.7-57.8 141-137.8 139.4l3.8-.3c74.2-46.7 109.3-118.6 109.3-205.1 0-38.1-6.5-75.9-18.9-112 1 11.7 1 23.7 1 35.4 0 91.8-18.1 241.6-116.6 280C95 455.2 49.4 398 49.4 329.2c0-75.6 57.4-142.3 135.4-142.3 16.8 0 33.7 3.1 49.1 9.6 1.7-15.1 6.5-29.9 13.4-43.3-19.9-7.2-41.2-10.7-62.5-10.7-161.5 0-238.7 195.9-129.9 313.7 67.9 74.6 192 73.9 259.8 0 56.6-61.3 60.9-142.4 36.4-201-12.7 8-27.1 13.9-42.2 17zM418.1 11.7c-31 66.5-81.3 47.2-115.8 80.1-12.4 12-20.6 34-20.6 50.5 0 14.1 4.5 27.1 12 38.8 47.4-11 98.3-46 118.2-90.7-.7 5.5-4.8 14.4-7.2 19.2-20.3 35.7-64.6 65.6-99.7 84.9 14.8 14.4 33.7 25.8 55 25.8 79 0 110.1-134.6 58.1-208.6z"></path></svg>
      <p>২-৩ ফুট দূর পর্যন্ত ছড়াবে</p>
    </div>
    <div class="feature-box">
      <svg aria-hidden="true" class="e-font-icon-svg e-fab-viadeo" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M276.2 150.5v.7C258.3 98.6 233.6 47.8 205.4 0c43.3 29.2 67 100 70.8 150.5zm32.7 121.7c7.6 18.2 11 37.5 11 57 0 77.7-57.8 141-137.8 139.4l3.8-.3c74.2-46.7 109.3-118.6 109.3-205.1 0-38.1-6.5-75.9-18.9-112 1 11.7 1 23.7 1 35.4 0 91.8-18.1 241.6-116.6 280C95 455.2 49.4 398 49.4 329.2c0-75.6 57.4-142.3 135.4-142.3 16.8 0 33.7 3.1 49.1 9.6 1.7-15.1 6.5-29.9 13.4-43.3-19.9-7.2-41.2-10.7-62.5-10.7-161.5 0-238.7 195.9-129.9 313.7 67.9 74.6 192 73.9 259.8 0 56.6-61.3 60.9-142.4 36.4-201-12.7 8-27.1 13.9-42.2 17zM418.1 11.7c-31 66.5-81.3 47.2-115.8 80.1-12.4 12-20.6 34-20.6 50.5 0 14.1 4.5 27.1 12 38.8 47.4-11 98.3-46 118.2-90.7-.7 5.5-4.8 14.4-7.2 19.2-20.3 35.7-64.6 65.6-99.7 84.9 14.8 14.4 33.7 25.8 55 25.8 79 0 110.1-134.6 58.1-208.6z"></path></svg>
      <p>সুটি কাপড়ে টানা ১২ ঘন্টা+ থাকবে</p>
    </div>
    <div class="feature-box">
      <svg aria-hidden="true" class="e-font-icon-svg e-fab-viadeo" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M276.2 150.5v.7C258.3 98.6 233.6 47.8 205.4 0c43.3 29.2 67 100 70.8 150.5zm32.7 121.7c7.6 18.2 11 37.5 11 57 0 77.7-57.8 141-137.8 139.4l3.8-.3c74.2-46.7 109.3-118.6 109.3-205.1 0-38.1-6.5-75.9-18.9-112 1 11.7 1 23.7 1 35.4 0 91.8-18.1 241.6-116.6 280C95 455.2 49.4 398 49.4 329.2c0-75.6 57.4-142.3 135.4-142.3 16.8 0 33.7 3.1 49.1 9.6 1.7-15.1 6.5-29.9 13.4-43.3-19.9-7.2-41.2-10.7-62.5-10.7-161.5 0-238.7 195.9-129.9 313.7 67.9 74.6 192 73.9 259.8 0 56.6-61.3 60.9-142.4 36.4-201-12.7 8-27.1 13.9-42.2 17zM418.1 11.7c-31 66.5-81.3 47.2-115.8 80.1-12.4 12-20.6 34-20.6 50.5 0 14.1 4.5 27.1 12 38.8 47.4-11 98.3-46 118.2-90.7-.7 5.5-4.8 14.4-7.2 19.2-20.3 35.7-64.6 65.6-99.7 84.9 14.8 14.4 33.7 25.8 55 25.8 79 0 110.1-134.6 58.1-208.6z"></path></svg>
      <p>এটি খুবই আনকমন একটি সুগন্ধি যা যেকোনো জায়গায় পাবেন না</p>
    </div>
  </div>
  <a id="link" href="#payment" class="link button">অর্ডার করতে ক্লিক করুন</a>
</div>

<!-- Dark Section - Why Choose Us -->
<div class="dark-section">
  <div class="container-page3">
    <div class="left">
      <img id="image" src="https://storage.googleapis.com/a1aa/image/UxV7aLlJRqDox9_v5weVQ4X2Aj0CDIB1JSi5A3hJYlM.jpg" alt="Perfume Promotion">
    </div>
    <div class="right">
      <h2>আমরা কেন অন্যদের চেয়ে আলাদা</h2>
      <ul>
        <li>আমরা দেশি লোকাল কোন সুগন্ধি সেল করি না</li>
        <li>আফটার সেল সার্ভিস আমাদের সুদীর্ঘ দীর্ঘদিনের</li>
        <li>পণ্য হাতে পাওয়ার ৩ দিনের মধ্যে গ্রহনযোগ্য সুবিধা</li>
        <li>প্রোডাক্ট পছন্দ না হলে রিটার্ন সুবিধা</li>
        <li>আমাদের রয়েছে ৭০+ প্রিমিয়াম সুগন্ধি যা থেকে আপনি আপনার পছন্দ মতো বাছাই করতে পারবেন</li>
      </ul>
      <a id="link" href="#payment" class="link button">অর্ডার করতে ক্লিক করুন</a>
    </div>
  </div>
</div>

</body>
</html>
`
      },

      {
        _id: '543543534',
        image: '/assets/page/page-44.png',
        name: 'Natural Beauty',
        link: '/assets/page/landing-page4.html',
        theme: `
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>
        Web Page Design
    </title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
        }

        /*.container {*/
        /*    @media (min-width: 1400px) {max-width: 1320px;}*/
        /*    @media (min-width: 1200px) {max-width: 1140px;}*/
        /*    @media (min-width: 992px) {max-width: 1320px;}*/
        /*    @media (min-width: 768px) {max-width: 720px;}*/
        /*    @media (min-width: 576px) {max-width: 540px;}*/
        /*}*/

        .section0 {
            background: #2a3a8a;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .section0 .top-heading {
            color: white;
            max-width: 992px;

            h3 {
                font-size: clamp(1rem, 2.5vw, 2.5rem);
                line-height: clamp(1.5rem, 4vw, 4.2rem);
                text-align: center;
            }
        }

        .section1 {
            /*background-image: url("/assets/page/bg.png");*/
            /*  background-position: center;*/
            /*  background-size: cover;*/
            /* background-repeat: no-repeat;*/
            background: #d9edf4;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 0;
            padding: 0 10px 10px 10px;
        }

        .section1 .use-time {
            padding-bottom: 60px;
            text-align: center;
            max-width: 1024px;
            width: 100%;
        }


        .section1 .use-time h3 {
            font-size: clamp(1rem, 2.5vw, 2rem);
            line-height: clamp(1.5rem, 2.5vw, 2.5rem);
            background: #f2d468;
            margin: 0;
            padding: 20px 0;
            border-radius: 0 0 16px 16px;
        }

        .section1 .theme-container {
            text-align: center;
            max-width: 990px;
            width: 88%;
            padding: 20px;
            margin: 0 auto;
            border-radius: 24px;
            background-color: white;
            box-shadow: 0 -1px 24px 0 #1e85d6;
        }

        .section1 .header {
            background-color: #fff1b7;
            color: #cc0000;
            font-weight: bold;
            font-size: 22px;
            padding: 15px;
            border-radius: 10px 10px 0 0;
            border: 8px solid #ffcc00;
        }

        /* .section1 .content {
            padding: 20px;
        } */
        .section1 .content p {
            color: #ffffff;
            margin-bottom: 20px;
        }

        .section1 .image-container {
            display: flex;
            justify-content: center;
            /* margin-bottom: 20px; */
        }

        .section1 .image-container img {
            width: 100%;
            /* height: auto; */
            max-height: 600px;
            height: 100%;
            border-radius: 8px;
        }

        .section1 .price {
            padding-left: 10px;
            color: #ffffff;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 17px;
            margin-bottom: 20px;
            border-radius: 16px 0;
            border-width: 1px;
            border-style: solid;
            border-color: rgb(242, 211, 53);
        }

        .section1 .price span {
            text-align: right;
            background-color: #cc0000;
            color: #ffffff;
            text-wrap: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            height: 100%;
            border-radius: 0 0 16px;
        }

        .section1 .button {
            text-align: center;
            font-size: 20px;
            line-height: 45px;
            font-weight: 700;
            display: inline-block;
            width: auto;
            margin-top: 30px;
            box-shadow: rgba(0, 0, 0, 0.1) 0 20px 20px 0;
            background: linear-gradient(90deg, rgb(242, 211, 53) 0px, rgb(242, 211, 53) 51%, rgb(201, 172, 31)) 0% 0% / 200%;
            transition: 0.5s;
            padding: 5px 15px;
            border-radius: 10px;
            border-width: 3px;
            border-style: solid;
            border-color: rgb(242, 68, 29);
            border-image: initial;
        }

        .section3 {
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 0;
        }

        .section3 .header-container {
            padding: 0 20px;
        }
        .section3 .single-card{
            padding: 20px;
        }

        .section3 .header {
            background-color: #2a3a8a;
            /*border: 2px solid #38A169;*/
            box-shadow: 0 -1px 24px 0 #1e85d6;
            border-radius: 8px;
            padding: 16px;
            text-align: center;
            margin-bottom: 24px;
            max-width: 1024px;
            width: 100%;
        }

        .section3 .header h1 {
            color: white;
            font-size: clamp(1.5rem, 2.5vw, 30px);
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .section3 .header h1 i {
            margin: 0 8px;
        }

        .section3 .content {
            background-color: white;
            border-radius: 8px;
            padding: 0;
            margin-bottom: 24px;
            width: 100%;
            max-width: 1024px;
        }

        .section3 .grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 20px;
        }

        @media (min-width: 768px) {
            .section3 .grid {
                grid-template-columns: 1fr 1fr;
            }

            .section3 .header-container .grid-container {
                padding: 0;
            }

            .section3 .content {
                padding: 24px;
            }

            .section3 {
                padding: 60px 0;
            }
        }

        .section3 .grid .single-card {
            /*border: 1px solid #E2E8F0;*/
            box-shadow: 0 -1px 24px 0 #1e85d6;
            border-radius: 24px;
            padding: 30px;
        }

        .section3 .grid .single-card .product-title {
            h3 {
                font-size: clamp(1rem, 2.5vw, 30px);
                color: #2a3a8a;
                padding-bottom: 20px;
                margin-bottom: 10px;
                border-bottom: 1px dashed #2a3a8a;
            }

            h4 {
                color: #2a3a8a;
                font-size: clamp(1rem, 2.5vw, 24px);
            }
        }

        .section3 .grid .single-card .single-content {
            color: #7a7a7a;
            font-size: clamp(1rem, 2.5vw, 22px);
            font-weight: 600;
        }

        .section3 .button {
            background: linear-gradient(to right, #ffcc00, #ff9900);
            color: #ffffff;
            font-weight: bold;
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            margin-top: 24px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .section3 .button:hover {
            background: linear-gradient(to right, #ff9900, #ffcc00);
        }

        .section3 .footer {
            color: #E53E3E;
            text-align: center;
        }

        .section6 {
            margin: 60px 0;
        }

        .section6 .container {
            background-color: #1b5e20;
            color: white;
            border-radius: 10px;
            padding: 20px;
            width: 80%;
            margin: 0 auto;
            max-width: 800px;
        }

        .section6 .header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }

        .section6 .header i {
            color: #ff5722;
            margin-right: 10px;
        }

        .section6 .header h1 {
            font-size: 1.5rem;
            font-weight: bold;
        }

        .section6 .content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
        }

        .section6 .content div {
            display: flex;
            align-items: start;
        }

        .section6 .content i {
            color: #4caf50;
            margin-right: 10px;
        }

        @media (min-width: 768px) {
            .section6 .content {
                grid-template-columns: 1fr 1fr;
            }
        }

        .section7 {
            max-width: 800px;
            width: 100%;
            margin-top: 50px;
        }

        .section7 .offer-container {
            margin: 0 auto;
            background-color: #f2f4ff;
            border: 6px solid #2a3a8a;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            /*max-width: 600px;*/
            /*width: 100%;*/
        }

        .section7 .offer-container p {
            color: #065f46;
            margin-bottom: 16px;
            font-size: 16px;
            line-height: 2.5em;
        }

        .section7 .offer-container .regular-price {
            color: #000000;
            font-size: clamp(1rem, 2.5vw, 30px);
            /*font-weight: bold;*/
            margin-bottom: 8px;
        }

        .section7 .offer-container .free-home-delivery {
            color: #000000;
            font-size: clamp(1rem, 2.5vw, 24px);
        }

        .section7 .offer-container .offer-price {
            color: #f82d6f;
            font-size: clamp(1rem, 2.5vw, 32px);
            line-height: 2px;
            font-weight: bold;
            margin-bottom: 16px;
        }

        .section7 .offer-container .contact-button {
            background-color: #f97316;
            color: white;
            padding: 10px 20px;
            border-radius: 9999px;
            font-size: 18px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
        }

        .section7 .offer-container .contact-button i {
            margin-right: 8px;
        }

        @media (max-width: 768px) {
            .section7 {
                width: 90%;
                margin: 30px auto;
            }

            .section1 .theme-container {
                width: 100%;
            }
        }

        .section4 {
            background: #2a3a8a;
            width: 100%;
        }

        .section4 .container {
            max-width: 1024px;
            width: 100%;
            margin: 0 auto;
            padding: 60px 20px;

            .top-heading {
                h3 {
                    color: #e8a878;
                    font-size: clamp(1.3rem, 2.5vw, 32px);
                    text-align: center;
                    line-height: 1.7em;
                }
            }
        }

        /*.section4 .video-section {*/
        /*    margin-bottom: 20px;*/
        /*    background: white;*/
        /*    padding: 20px;*/
        /*}*/
        .section4 .info-offer-section {
            background-color: #4CAF50;
            color: #FFD700;
            text-align: center;
            padding: 20px;
            border-radius: 10px;
            border: 4px solid #006400;
            margin-bottom: 20px;
        }

        .section4 .info-offer-section p {
            margin: 10px 0;
            font-size: 1.2em;
            font-weight: bold;
        }

        .section4 .offer-box {
            background-color: #C8E6C9;
            color: #2E7D32;
            padding: 20px;
            border-radius: 10px;
            border: 4px solid #4CAF50;
            display: inline-block;
        }

        .section4 .offer-box span {
            background-color: #FF5722;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            margin-left: 10px;
        }

        .section4 .order-button {
            text-align: center;
        }

        .section4 .order-button button {
            background-color: #FFEB3B;
            color: #D32F2F;
            font-size: 1.2em;
            font-weight: bold;
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
        }

        .video-container {
            margin: 50px 0;
            padding: 10px;
            width: 100%;
            background: #fff;

            iframe {
                height: 100%;
                width: 100%;
                min-height: 250px;
            }
        }

        @media (min-width: 768px) {
            .video-container {
                height: 450px;
                padding: 25px;
            }
        }

        .section8 {
            background: linear-gradient(rgb(255, 225, 202), rgba(255, 225, 202, 0));

            padding-top: 80px;
            width: 100%;

            .container {
                max-width: 1024px;
                width: 100%;
                margin: 0 auto;
                padding: 20px;
            }

            .list {
                margin-top: 60px;
                padding: 20px 0;
                background: #fff;
                box-shadow: 0 11px 16px -11px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                svg {
                    fill: #F2D368;
                    width: 60px;
                    height: 50px;
                }

                .list-item {
                    font-size: clamp(1.2em, 2.5vw, 25px);
                    font-weight: 600;
                    color: #2A3AA8;
                    border-bottom: 1px solid #c4c4c4;
                    list-style-type: none;
                    padding: 15px 36px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: start;

                    &:last-child {
                        border-bottom: none;
                        padding-bottom: 0;
                    }
                }
            }

        }

        @media (max-width: 768px) {
            .section8{
                padding-top: 40px;
            }
            .section8 .list {
                padding-top: 30px;
                .list-item {
                    padding: 5px 10px 10px;
                    margin: 16px 0;
                    align-items: start;
                    svg {
                        width: 50px;
                        height: 40px;
                    }
                }
            }
        }
    </style>
</head>
<body>

<div class="section0">
    <div class="top-heading">
        <h3>আপনার সৌন্দর্যের জন্য সেরা কম্বো প্যাকেজ একটাই প্রাকৃতিক সমাধান</h3>
    </div>
</div>

<div class="section1">
    <div class="use-time">
        <h3>কমপক্ষে ১ বছর ঘরে বসে ব্যবহার করুন</h3>
    </div>
    <div class="theme-container">
        <div class="content">
            <div class="image-container">
                <img id="image" alt="Two bottles of a health supplement with a red ribbon around them" height="300"
                     src="https://storage.googleapis.com/a1aa/image/hGWOwM92DsOoO1L3YyFbyOR2XfXsgGkpv1jOMhTpUFg.jpg"
                     width="200"/>
            </div>

            <!--         <button class="button">-->
            <!--          অর্ডার করতে ক্লিক করুন-->
            <!--         </button>-->
        </div>
    </div>

    <div style="border: 2px solid #003366;margin-top: 50px; margin-bottom: 30px; padding: 20px; border-radius: 10px; text-align: center; background: transparent; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
        <p style="color: red; font-size: clamp(1rem, 2.5vw, 24px); text-decoration: line-through; margin: 0;">
            প্রথম অর্ডার করলে পাচ্ছেন ১৯৯০ টাকার প্যাকেজ
        </p>
        <p style="color: #003366; font-size: clamp(1rem, 2.5vw, 30px); font-weight: bold; margin: 10px 0;">
            অফার প্রাইসঃ মাত্র ১২৫০ টাকা।
        </p>
        <div style="display: flex; justify-content: center; align-items: center">
            <button style="background-color: #fdd835; color: white; margin-top: 20px; font-size: clamp(1rem, 2.5vw, 22px); font-weight: bold; padding: 12px 16px; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 3px solid #e91e63; display: flex; align-items: center; gap: 10px">
                অর্ডার করতে ক্লিক করুন
                <span>
                  <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                       xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 902.86 902.86"
                       xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier"
                                                                                              stroke-linecap="round"
                                                                                              stroke-linejoin="round"></g><g
                          id="SVGRepo_iconCarrier"> <g> <g> <path
                          d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"></path> <path
                          d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z"></path> </g> </g> </g></svg>
              </span>
            </button>
        </div>
    </div>
</div>


<div class="section3">
    <div class="header-container">
        <div class="header">
            <h1>
                <i class="fas fa-angle-double-left"></i> বাংলাদেশে তৈরি একমাত্র আমাদের হাতে তৈরি সাবান
                <i class="fas fa-angle-double-right"></i>
            </h1>
        </div>
    </div>

    <div class="content">
        <div class="grid-container">
            <div class="grid">
                <div class="single-card">
                    <div class="product-title">
                        <h3>দারুচিনি সাবান বার</h3>
                        <h4>উপকারিতাঃ</h4>
                    </div>
                    <p class="single-content">ব্রণ ও ব্রণের দাগ দূর করে।</p>
                    <p class="single-content">ডার্ক সার্কেল রিমুভ করে ভুক টাইট করে।</p>
                    <p class="single-content">ত্বকের যে কোন দাগ রিমুভ করে।</p>
                    <p class="single-content">প্রাকৃতিকভাবে চেহারা ফর্সা করে ৫ শেড পর্যন্ত।</p>
                    <p class="single-content">সঠিক পুষ্টি যুগিয়ে ত্বকে ময়শ্চারাইজিং আনে।</p>
                    <div>
                    </div>
                </div>
                <div class="single-card">
                    <div class="product-title">
                        <h3>পেঁপে সাদা করার সাবান</h3>
                        <h4>উপকারিতাঃ</h4>
                    </div>
                    <p class="single-content">ত্বক ফর্সা করে।</p>
                    <p class="single-content">ত্বকের উজ্জলতা বৃদ্ধি করে।</p>
                    <p class="single-content">ব্রণ ও ব্রণের দাগ দূর করে।</p>
                    <p class="single-content">রোদ্রে পোড়া দাগ দূর করে।</p>
                    <p class="single-content">আগুনে পোড়া দাগ দূর করে।</p>
                    <p class="single-content">ব্রনের দাগ দূর করে।</p>
                    <div>
                    </div>
                </div>
            </div>
        </div>

        <div style="display: flex; justify-content: center; align-items: center">
            <a class="link" id="link" href="#payment" style="background-color: #fdd835; color: white; margin-top: 20px; font-size: clamp(1rem, 2.5vw, 22px); font-weight: bold; padding: 12px 16px; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 3px solid #e91e63; display: flex; align-items: center; gap: 10px">
                অর্ডার করতে ক্লিক করুন
                <span>
                  <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                       xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 902.86 902.86"
                       xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier"
                                                                                              stroke-linecap="round"
                                                                                              stroke-linejoin="round"></g><g
                          id="SVGRepo_iconCarrier"> <g> <g> <path
                          d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"></path> <path
                          d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z"></path> </g> </g> </g></svg>
              </span>
            </a>
        </div>

    </div>


    <div class="section4">
        <div class="container">
            <div class="top-heading">
                <h3>ফেস কেয়ার সেট কম্বো সব সমস্যা সমাধানে প্রাকৃতিক সেরা কম্বো প্যাকেজ অম্পর্ক আরো জানুন</h3>
            </div>
            <!-- Video Section -->
            <div class="video-container">
                <iframe id="video" src="https://www.youtube.com/embed/0IHfyRidDlE" frameborder="0"
                        allowfullscreen></iframe>
            </div>

            <!-- Order Button -->
            <div style="display: flex; justify-content: center; align-items: center">
                <a class="link" id="link" href="#payment" style="background-color: #fdd835; color: white; margin-top: 20px; font-size: clamp(1rem, 2.5vw, 22px); font-weight: bold; padding: 12px 16px; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 3px solid #e91e63; display: flex; align-items: center; gap: 10px">
                    অর্ডার করতে ক্লিক করুন
                    <span>
                  <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                       xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 902.86 902.86"
                       xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier"
                                                                                              stroke-linecap="round"
                                                                                              stroke-linejoin="round"></g><g
                          id="SVGRepo_iconCarrier"> <g> <g> <path
                          d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"></path> <path
                          d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z"></path> </g> </g> </g></svg>
              </span>
                </a>
            </div>
        </div>
    </div>

    <div class="section8">
        <div class="container">
            <div class="header">
                <h1>
                    <i class="fas fa-angle-double-left"></i> বাংলাদেশে তৈরি একমাত্র আমাদের হাতে তৈরি সাবান
                    <i class="fas fa-angle-double-right"></i>
                </h1>
            </div>
            <ul class="list">
                <li class="list-item">
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#434343">
                        <path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Zm80-207Zm0 134 210-134-210-134v268Z"/>
                    </svg>
                        </span>
                    <span>আকর্ষনীয় প্যাকিং সুবিধা।</span></li>

                <li class="list-item">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#434343">
                        <path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Zm80-207Zm0 134 210-134-210-134v268Z"/>
                    </svg>
                        </span>
                    <span>সাশ্রয়ী মূল্যে বাংলাদেশে হাতে তৈরি কোয়ালিটি প্রোডাক্ট।</span></li>
                <li class="list-item">
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#434343">
                        <path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Zm80-207Zm0 134 210-134-210-134v268Z"/>
                    </svg>
                        </span>
                    <span>১০০% কোয়ালিটি এবং ৩ দিনের রিটার্ন গ্যারান্টি। সার্বক্ষনিক কল</span></li>
                <li class="list-item">
                    <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#434343">
                        <path d="M320-273v-414q0-17 12-28.5t28-11.5q5 0 10.5 1.5T381-721l326 207q9 6 13.5 15t4.5 19q0 10-4.5 19T707-446L381-239q-5 3-10.5 4.5T360-233q-16 0-28-11.5T320-273Zm80-207Zm0 134 210-134-210-134v268Z"/>
                    </svg>
                        </span>
                    <span>সারাদেশে ২৪ থেকে ৭২ ঘন্টায় হোম ডেলিভারি।</span></li>
            </ul>
        </div>

    </div>

    <div class="section7">
        <div class="offer-container">
            <p class="regular-price">৪০০ গ্রামের রেগুলার মূল্য ১২০০ টাকা।</p>
            <p class="offer-price">অফার মূল্য = ৮৫০/-টাকা</p>
            <p class="free-home-delivery">(ফ্রি হোম ডেলিভারি!!)</p>
            <div style="display: flex; justify-content: center; align-items: center">
                <a class="link" id="link" href="#payment" style="background-color: #fdd835; color: white; margin-top: 20px; font-size: clamp(1rem, 2.5vw, 22px); font-weight: bold; padding: 12px 16px; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 3px solid #e91e63; display: flex; align-items: center; gap: 10px">
                    অর্ডার করতে ক্লিক করুন
                    <span>
                  <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                       xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 902.86 902.86"
                       xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier"
                                                                                              stroke-linecap="round"
                                                                                              stroke-linejoin="round"></g><g
                          id="SVGRepo_iconCarrier"> <g> <g> <path
                          d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"></path> <path
                          d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717 c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744 c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742 C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744 c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742 S619.162,694.432,619.162,716.897z"></path> </g> </g> </g></svg>
              </span>
                </a>
            </div>
        </div>
    </div>
</div>
</body>
</html>

`
      },
      {
        _id: '5435435358',
        image: '/assets/page/landing-page5 (2).png',
        name: 'Protein Powder',
        link: '/assets/page/landing-page5.html',
        theme: `
<html lang="bn">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <title>প্রোটিন পাউডার</title>
    <style>
        body {
            background-color: #fff;
            color: #000;
            font-family: sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 1140px;
            margin: 0 auto;
            /*padding: 0 8px;*/
        }

        /* Header green bar */
        .header-bar {
            background-color: #064e03;
            color: #ffffff;
            text-align: center;
            font-weight: bold;
            font-size: 35px;
            padding: 15px;
            border-radius: 4px;
            margin-top: 8px;
        }

        .color-white {
            color: #FFF63A;
        }

        /* protein-bar */
        .protein-bar {
            background-color: #064e03;
            color: #ffffff;
            text-align: center;
            font-weight: bold;
            font-size: 35px;
            padding: 15px;
            border-radius: 4px;
            margin-top: 8px;
        }

        .protein-bar .yellow {
            color: #FFF63A;
        }

        /* Subheading */
        .subheading {
            text-align: center;
            color: rgb(0, 0, 0);
            font-size: 22px;
            font-weight: 600;
            margin-block: 20px;
        }

        /* Video container */
        .video-container {
            margin-top: 8px;
            border: 3px solid red;
            overflow: hidden;
            max-width: 100%;
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
        }

        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }

        /* Button style */
        .btn-area {
            text-align: center;
            padding: 15px;
            margin-top: 40px;
            display: flex;
            justify-content: center;

            .cta-button {
                animation: scale 1s linear infinite alternate;
                background-image: linear-gradient(180deg, #FF0000 0%, #650000 100%);
                color: #ffffff;
                border: 3px solid #ffffff;
                padding: 12px 20px;
                font-size: 25px;
                cursor: pointer;
                transition: 0.3s;
                font-family: 'LiAdorNoirrit';
                font-weight: 700;
                border-radius: 10px 10px 10px 10px;
                box-shadow: 1px 9px 7px 0px rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;

                span {
                    background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgb(193, 193, 193) 50%, rgba(255, 255, 255, 1) 100%);
                    background-size: 200% 100%;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientAnimation 6s infinite linear;
                }
            }
        }

        @keyframes scale {
            0% {
                transform: scale(1);
            }

            100% {
                transform: scale(1.08);
            }
        }

        @keyframes slidebg {
            to {
                background-position: 20vw;
            }
        }

        @keyframes gradientAnimation {
            0% {
                background-position: 200% 0;
            }

            100% {
                background-position: -200% 0;
            }
        }


        /* Centered container for buttons */
        .centered {
            text-align: center;
            margin-top: 8px;
        }

        /* Product banner */
        .product-banner {
            margin-top: 16px;
            background: #fff;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            padding: 16px;
        }

        .product-banner img {
            width: 100%;
            height: auto;
            object-fit: contain;
        }

        .offer-bar {
            text-align: center;
            margin-top: 12px;
            background-color: #00571c;
            padding: 15px 15px 15px 15px;
            border-radius: 10px 10px 10px 10px;
            font-size: 35px;
            font-weight: 700;
            line-height: 45px;
            color: #FFFFFF;
        }

        .offer-text {
            text-align: center;
            margin-top: 12px;
            font-size: 39px;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .offer-text .red {
            color: #ff0000;
        }

        .offer-text .green {
            color: #17a102;
        }

        .offer-subtext {
            text-align: center;
            margin-top: 15px;
            margin-bottom: 12px;
            font-size: 39px;
            font-weight: 700;
            color: #ff0000;
        }

        /* Horizontal scroll images */
        .scroll-images {
            margin-top: 16px;
            display: flex;
            gap: 8px;
            overflow-x: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .scroll-images::-webkit-scrollbar {
            display: none;
        }

        .scroll-images img {
            flex-shrink: 0;
            width: 180px;
            height: 150px;
            object-fit: contain;
            border: 1px solid #d1d5db;
            border-radius: 6px;
        }

        /* Features section */
        .features-section {
            margin-top: 24px;
            background-color: #064e03;
            color: #fff;
            border-radius: 6px;
            padding: 16px;
        }

        .features-section h2 {
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 12px;
            border-bottom: 1px solid #fff;
            padding-bottom: 6px;
        }

        .features-list {
            list-style: none;
            padding-left: 0;
            margin: 0;
            font-size: 14px;
            line-height: 1.4;
        }

        .features-list li {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
        }

        .features-list li:last-child {
            margin-bottom: 0;
        }

        .features-list li .check {
            color: #facc15;
            font-size: 16px;
            flex-shrink: 0;
        }

        /* Special ingredients section */
        .special-ingredients {
            margin-top: 24px;
            /* background-color: #064e03; */
            color: #facc15;
            border-radius: 6px;
            /* padding: 16px; */
        }

        .special-ingredients h2 {
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 12px;
            border-bottom: 1px solid #facc15;
            padding-bottom: 6px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            background: #fff;
            color: #000;
            border-radius: 6px;
            /* border: 1px solid #d1d5db;
            padding: 8px; */
        }

        .grid-item {
            border: 3px solid #000000;
            padding: 4px;
            /* text-align: center; */
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .grid-item img {
            width: 100%;
            height: 234px;
            object-fit: contain;
            margin: 0 auto;
        }

        .grid-item .div {
            background: #D2D2D2;
            margin-top: 4px;
            padding: 2px 0;
            font-size: 30px;
            font-weight: 600;
            color: #000000;
            text-align: center;
        }

        .grid-item .last-div {
            height: 80px;
        }

        /* Service note */
        .service-note {
            margin-top: 24px;
            color: #fff;
            padding: 16px;
            text-align: center;
            font-weight: 600;
            font-size: 35px;
            background-color: #064e03;
            padding: 15px 15px 15px 15px;
            border-style: solid;
            border-color: #DDFF00;
            border-radius: 10px 10px 10px 10px;
        }

        .service-note-section {
            width: 100%;
            height: 400px;
            position: relative;
            background-color: #00571c;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;

            .first-wave {
                position: absolute;
                top: 18px;
            }

            .second-wave {
                position: absolute;
                bottom: -1px;
                width: 100%;
            }

            .morning-btn {
                z-index: 9;
            }

            .morning-btn .morning-text {
                font-size: 26px;
                color: #ffffff;
                margin-top: 130px;
            }
        }

        .service-note-section-top {
            width: 100%;
            height: 750px;
            position: relative;
            background-color: #00571c;
            overflow: hidden;
            /* display: flex;
            justify-content: center;
            align-items: center; */

            .first-wave {
                position: absolute;
                top: 18px;
            }

            .second-wave {
                position: absolute;
                bottom: -1px;
                width: 100%;
            }

            .morning-btn {
                z-index: 9;
            }

            .morning-btn .morning-text {
                font-size: 26px;
                color: #ffffff;
                margin-top: 180px;
            }
        }

        /* Customer review */
        .customer-review-header {
            margin-top: 24px;
            background-color: #064e03;
            color: #fff;
            border-radius: 6px;
            padding: 16px;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            border-bottom: 1px solid #fff;
        }

        .customer-review-img {
            margin-top: 8px;
            text-align: center;
        }

        .customer-review-img img {
            max-width: 100%;
            height: auto;
        }

        /* Contact call to action */
        .contact-cta {
            margin-top: 16px;
            background: #ffe4e6;
            border-radius: 6px;
            padding: 12px;
            text-align: center;
        }

        .contact-cta p {
            margin: 0;
            margin-bottom: 15px;
            font-size: 37px;
            font-weight: 700;
            line-height: 56px;
            color: #000000;
        }

        .contact-phone,
        .contact-whatsapp {
            margin-top: 8px;
            padding: 6px 12px;
            text-decoration: none;
            border-style: dotted;
            border-width: 2px 2px 2px 2px;
            border-radius: 20px 20px 20px 20px;
            font-size: 35px;
            font-weight: 500;
            line-height: 45px;

            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
        }

        .contact-phone {
         margin-top: 8px;
            padding: 6px 12px;
            text-decoration: none;
            border-style: dotted;
            border-width: 2px 2px 2px 2px;
            border-radius: 20px 20px 20px 20px;
            font-size: 35px;
            font-weight: 500;
            line-height: 45px;

            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            background: #3708AA;
            color: #fff;
            max-width: 254px;
        }

        .contact-whatsapp {
         margin-top: 8px;
            padding: 6px 12px;
            text-decoration: none;
            border-style: dotted;
            border-width: 2px 2px 2px 2px;
            border-radius: 20px 20px 20px 20px;
            font-size: 35px;
            font-weight: 500;
            line-height: 45px;

            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            background: #00C21B;
            color: #fff;
            max-width: 224px;
        }

        .phone-call-svg path {
            color: #ffffff;
        }

        /* Footer */
        footer {
            text-align: center;
            margin-top: 16px;
            font-size: 25px;
            font-weight: 600;
            color: #fff;
            background: #000;
            padding: 22px 0;
        }

                    .w-250 {
            max-width: 271px;
            }

        footer a {
            color: #ff0000;
            font-weight: bold;
            text-decoration: none;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
            .header-bar {
                padding: 9px;
                font-size: 23px;
            }

            .protein-bar {
                padding: 9px;
                font-size: 23px;
            }

            .subheading {
                font-size: 14px;
            }

            .video-container {
                border-radius: 8px;
            }

            .btn-area .cta-button {
                border-radius: 32px;
                padding: 8px 15px;
                font-size: 14px;
            }

            .offer-bar {
                font-size: 20px;
                line-height: 30px;
                padding: 10px;
            }

            .contact-cta p {
                font-size: 20px;
            }

            .contact-phone,
            .contact-whatsapp {
                font-size: 25px;
            }

                 .contact-phone {
                font-size: 25px;
            }

            .contact-phone {
                max-width: 225px;
            }

            .contact-whatsapp {
                max-width: 225px;
            }

            footer {
                font-size: 15px;
                padding-inline: 5px;
            }

            .offer-text {
                font-size: 22px;
            }

            .offer-subtext {
                font-size: 16px;
                font-weight: 500;
            }

            .scroll-images img {
                width: 140px;
                height: 120px;
            }

            .special-ingredients {
                padding: 12px;
            }

            .special-ingredients h2 {
                font-size: 14px;
                margin-bottom: 10px;
                padding-bottom: 4px;
            }

            .grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                padding: 6px;
            }

            .grid-item img {
                width: 100%;
                height: 234px;
            }

            .grid-item .last-div {
                height: 20px;
            }

            .grid-item {
                border: 1px solid #000000;
                border-radius: 8px;
            }


            .service-note {
                font-size: 25px;
                padding: 12px;
            }

            .mob-service-note {
                margin: 20px;
                font-size: 20px;
            }

            .morning-text {
                margin: 20px;
                font-size: 20px;
            }

            .features-section h2 {
                font-size: 14px;
            }

            .features-list {
                font-size: 13px;
            }
        }

        @media (max-width: 400px) {
            .scroll-images img {
                width: 120px;
                height: 100px;
            }

            .grid {
                grid-template-columns: 1fr;
                gap: 6px;
                padding: 6px;
            }

            .grid-item img {
                width: 100%;
                height: 234px;
            }

            .special-ingredients h2 {
                font-size: 13px;
            }

            .service-note {
                font-size: 25px;
                padding: 10px;
            }

            .features-section h2 {
                font-size: 13px;
            }

            .features-list {
                font-size: 12px;
            }
        }
    </style>
</head>

<body>
    <div>
        <!-- Header green bar -->
        <div class="container">
            <div class="header-bar">
                সম্পূর্ণ প্রাকৃতিক ফার্মুলায় তৈরি - <span style="color:#FFF63A;">প্রোটিন পাউডার</span>
            </div>
        </div>
        <!-- Subheading -->
        <div class="container">
            <p class="subheading">
                এটি শারীরিক দুর্বলতা দূর করে স্থায়ীভাবে ওজন বাড়ায় — ফিট বডি ও মাসল গঠনে অত্যন্ত সহায়ক
            </p>
        </div>
        <!-- Video embed container -->
        <div class="container">
               <div class="video-container">
                <iframe id="video" src="https://www.youtube.com/embed/YV3ZdgSUO1M?si=N30IDR8Bu6m9s82K" frameborder="0"
                        allowfullscreen></iframe>
            </div>

        </div>

        <!-- Order button below video -->
        <div class="container">
            <div class="btn-area" style="margin-top:8px;">
                <a id="link" href="#payment" class="cta-button link" style="text-decoration: none" type="button">
                    <svg width="30px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16"
                                stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                    </svg>
                    অর্ডার করতে চাই
                </a>
            </div>
        </div>
        <!-- Product banner with white background and shadow -->
        <div class="container">
            <div class="product-banner">
                <img src="https://rmlifebd.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-02-at-17.30.52_180b365f-1024x576.jpg"
                    alt="প্রোটিন পাউডার ব্যানার ছবি একটি গ্লাস সহ জার সহ সবুজ ব্যাকগ্রাউন্ড" />
                <div class="offer-bar">সীমিত সময়ের বিশেষ অফার !</div>
                <p class="offer-text">
                    <span class="red"><del>১৬৩৫</del></span> টাকার প্রোটিন পাউডার এখন <span class="green"> মাত্র ৯৫০
                        টাকা!</span>
                </p>
                <p class="offer-subtext">সাথে ভেলভারি চার্জ একদম ফ্রি!!</p>

                <div class="btn-area" style="margin-top:8px;">
                    <a id="link" href="#payment" class="cta-button link" style="text-decoration: none" type="button">
                        <svg width="30px" height="27px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16"
                                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </g>
                        </svg>
                        অর্ডার করতে ক্লিক করুন
                    </a>

                </div>
            </div>
        </div>
        <!-- Three product feature images row -->
<!--        <div class="container">-->
<!--            <div class="scroll-images" aria-label="প্রোটিন পাউডার ছবি গ্যালারি">-->
<!--                <img src="https://storage.googleapis.com/a1aa/image/097c2419-241a-47eb-2a39-55df099b048a.jpg"-->
<!--                    alt="প্রোটিন পাউডার ছবি ১ একজন পুরুষ সহ" />-->
<!--                <img src="https://storage.googleapis.com/a1aa/image/d6337789-70ca-4e14-b0fc-1cce0b60b7d7.jpg"-->
<!--                    alt="প্রোটিন পাউডার ছবি ২ পুরুষ হাত উঁচু করে" />-->
<!--                <img src="https://storage.googleapis.com/a1aa/image/063e9859-da52-45db-620c-7bbcdd047d63.jpg"-->
<!--                    alt="প্রোটিন পাউডার ছবি ৩ পুরুষ হাসছে" />-->
<!--            </div>-->
<!--        </div>-->

        <!-- Features section with green background and white text -->
        <!-- <div class="container">
            <div class="features-section">
                <h2>প্রোটিন পাউডারের উপকারিতা</h2>
                <ul class="features-list" aria-label="প্রোটিন পাউডারের উপকারিতা তালিকা">
                    <li><span class="check">✔</span> মাংসপেশী বৃদ্ধি &amp; ওজন বাড়াতে সাহায্য করে</li>
                    <li><span class="check">✔</span> নার্ভাস সিস্টেমের জন্য উপকারী</li>
                    <li><span class="check">✔</span> হাড়জোড়ের শক্তি বৃদ্ধি করে</li>
                    <li><span class="check">✔</span> ঘুমের গুণ ও ওজনের ভারসাম্য</li>
                    <li><span class="check">✔</span> হরমোনিয়ন ও অ্যান্টিবডি সমর্থন</li>
                    <li><span class="check">✔</span> চামড়া নরম করে</li>
                    <li><span class="check">✔</span> পেটের ও কিডনি সমস্যার থেকে রক্ষা করে</li>
                    <li><span class="check">✔</span> মিষ্টি রোগ ও রক্তের চাপের নিয়ন্ত্রণে সাহায্য করে</li>
                    <li><span class="check">✔</span> ইমিউন ও রোগ প্রতিরোধ ক্ষমতা বাড়ায়</li>
                </ul>

                <div class="btn-area" style="margin-top:8px;">
                    <a id="link" href="#payment" class="cta-button link" style="text-decoration: none" type="button">
                        <svg width="30px" height="27px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16"
                                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </g>
                        </svg>
                        অর্ডার করতে চাই
                    </a>
                </div>

            </div>
        </div> -->


        <div class="service-note-section-top">
            <div class="container"
                style="position: absolute; z-index: 9999; width: 100%; top: 12%; left: 50%; transform: translate(-50%, -50%);">
                <div class="service-note mob-service-note">
                    প্রোটিন পাউডারের উপকারিতা
                </div>
            </div>
            <svg class="first-wave" style="fill: #ffffff;transform: scale(1.2);" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 283.5 27.8" preserveAspectRatio="none">
                <path class="elementor-shape-fill"
                    d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7\ts-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7\tc-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3\tc-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6\tc0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7\tC239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5\tc0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1\tc-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7\tc0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6\tC8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8\tc0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2\tC74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3\tC97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1\tz M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1\tc-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z">
                </path>
                <path class="elementor-shape-fill"
                    d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3\tC267.7,18.8,269.7,18,269.6,18z">
                </path>
                <path class="elementor-shape-fill"
                    d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2\tS227.6,9.9,227.4,9.8z">
                </path>
                <path class="elementor-shape-fill"
                    d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4\tC206.4,12.9,204.6,13.5,204.5,13.4z">
                </path>
                <path class="elementor-shape-fill"
                    d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6\tS201,10.7,201,10.6z">
                </path>
                <path class="elementor-shape-fill"
                    d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3\tC152.6,27.5,154.6,26.8,154.5,26.7z">
                </path>
                <path class="elementor-shape-fill"
                    d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6\tc-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z">
                </path>
                <path class="elementor-shape-fill"
                    d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0\tC76.9,11.5,75.3,12.5,75.5,12.6z">
                </path>
                <path class="elementor-shape-fill"
                    d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4\tC19.9,13.7,15.7,13.3,15.6,13.2z">
                </path>
            </svg>

            <svg class="second-wave" style="fill: #ffffff;transform: rotate(180deg)" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1047.1 3.7" preserveAspectRatio="xMidYMin slice">
                <path class="elementor-shape-fill"
                    d="M1047.1,0C557,0,8.9,0,0,0v1.6c0,0,0.6-1.5,2.7-0.3C3.9,2,6.1,4.1,8.3,3.5c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3C13.8,2,16,4.1,18.2,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C23.6,2,25.9,4.1,28,3.5c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C63,2,65.3,4.1,67.4,3.5\tC68.3,3.3,69,1.6,69,1.6s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tC82.7,2,85,4.1,87.1,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C92.6,2,94.8,4.1,97,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.6-0.4V0z M2.5,1.2C2.5,1.2,2.5,1.2,2.5,1.2C2.5,1.2,2.5,1.2,2.5,1.2z M2.7,1.4c0.1,0,0.1,0.1,0.1,0.1C2.8,1.4,2.8,1.4,2.7,1.4z">
                </path>
            </svg>

            <div class="morning-btn">
                <div class="morning-text">
                    <div class="container">
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li
                                style="display: flex; align-items: center; padding: 8px 0; color: white; font-weight: 700; font-size: 16px; border-bottom: 1px solid #9dbb8f;">
                                <div
                                    style="flex-shrink: 0; width: 32px; height: 32px; background-color: #f9f9a7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                                        class="svg-inline--fa fa-check" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: #065014;">
                                        <path
                                            d="M173.898 439.404l-166.4-166.4c-12.497-12.497-12.497-32.758 0-45.255l45.255-45.255c12.497-12.497 32.758-12.497 45.255 0L192 312.69 432.345 72.344c12.497-12.497 32.758-12.497 45.255 0l45.255 45.255c12.497 12.497 12.497 32.758 0 45.255l-294.4 294.4c-12.497 12.497-32.758 12.497-45.255 0z">
                                        </path>
                                    </svg>
                                </div>
                                স্থায়ীভাবে স্বাস্থ্য ও ওজন বৃদ্ধি করে
                            </li>
                            <li
                                style="display: flex; align-items: center; padding: 8px 0; color: white; font-weight: 700; font-size: 16px; border-bottom: 1px solid #9dbb8f;">
                                <div
                                    style="flex-shrink: 0; width: 32px; height: 32px; background-color: #f9f9a7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                                        class="svg-inline--fa fa-check" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: #065014;">
                                        <path
                                            d="M173.898 439.404l-166.4-166.4c-12.497-12.497-12.497-32.758 0-45.255l45.255-45.255c12.497-12.497 32.758-12.497 45.255 0L192 312.69 432.345 72.344c12.497-12.497 32.758-12.497 45.255 0l45.255 45.255c12.497 12.497 12.497 32.758 0 45.255l-294.4 294.4c-12.497 12.497-32.758 12.497-45.255 0z">
                                        </path>
                                    </svg>
                                </div>
                                শারীরিক দুর্বলতা দূর করে
                            </li>

                            <li
                                style="display: flex; align-items: center; padding: 8px 0; color: white; font-weight: 700; font-size: 16px; border-bottom: 1px solid #9dbb8f;">
                                <div
                                    style="flex-shrink: 0; width: 32px; height: 32px; background-color: #f9f9a7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                                        class="svg-inline--fa fa-check" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: #065014;">
                                        <path
                                            d="M173.898 439.404l-166.4-166.4c-12.497-12.497-12.497-32.758 0-45.255l45.255-45.255c12.497-12.497 32.758-12.497 45.255 0L192 312.69 432.345 72.344c12.497-12.497 32.758-12.497 45.255 0l45.255 45.255c12.497 12.497 12.497 32.758 0 45.255l-294.4 294.4c-12.497 12.497-32.758 12.497-45.255 0z">
                                        </path>
                                    </svg>
                                </div>
                                ক্যালসিয়ামের ঘাটতি পূরণ করে
                            </li>

                            <li
                                style="display: flex; align-items: center; padding: 8px 0; color: white; font-weight: 700; font-size: 16px; border-bottom: 1px solid #9dbb8f;">
                                <div
                                    style="flex-shrink: 0; width: 32px; height: 32px; background-color: #f9f9a7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                                        class="svg-inline--fa fa-check" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: #065014;">
                                        <path
                                            d="M173.898 439.404l-166.4-166.4c-12.497-12.497-12.497-32.758 0-45.255l45.255-45.255c12.497-12.497 32.758-12.497 45.255 0L192 312.69 432.345 72.344c12.497-12.497 32.758-12.497 45.255 0l45.255 45.255c12.497 12.497 12.497 32.758 0 45.255l-294.4 294.4c-12.497 12.497-32.758 12.497-45.255 0z">
                                        </path>
                                    </svg>
                                </div>
                                মুখের রুচি ও হজমশক্তি বাড়ায়
                            </li>

                            <li
                                style="display: flex; align-items: center; padding: 8px 0; color: white; font-weight: 700; font-size: 16px; border-bottom: 1px solid #9dbb8f;">
                                <div
                                    style="flex-shrink: 0; width: 32px; height: 32px; background-color: #f9f9a7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                                        class="svg-inline--fa fa-check" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: #065014;">
                                        <path
                                            d="M173.898 439.404l-166.4-166.4c-12.497-12.497-12.497-32.758 0-45.255l45.255-45.255c12.497-12.497 32.758-12.497 45.255 0L192 312.69 432.345 72.344c12.497-12.497 32.758-12.497 45.255 0l45.255 45.255c12.497 12.497 12.497 32.758 0 45.255l-294.4 294.4c-12.497 12.497-32.758 12.497-45.255 0z">
                                        </path>
                                    </svg>
                                </div>
                                কোষ্ঠকাঠিন্য ও গ্যাস্ট্রিকের সমাধান
                            </li>

                            <li
                                style="display: flex; align-items: center; padding: 8px 0; color: white; font-weight: 700; font-size: 16px; border-bottom: 1px solid #9dbb8f;">
                                <div
                                    style="flex-shrink: 0; width: 32px; height: 32px; background-color: #f9f9a7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                                        class="svg-inline--fa fa-check" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: #065014;">
                                        <path
                                            d="M173.898 439.404l-166.4-166.4c-12.497-12.497-12.497-32.758 0-45.255l45.255-45.255c12.497-12.497 32.758-12.497 45.255 0L192 312.69 432.345 72.344c12.497-12.497 32.758-12.497 45.255 0l45.255 45.255c12.497 12.497 12.497 32.758 0 45.255l-294.4 294.4c-12.497 12.497-32.758 12.497-45.255 0z">
                                        </path>
                                    </svg>
                                </div>
                                পুরুষ ও মহিলা উভয়েই খেতে পারবেন
                            </li>

                            <li
                                style="display: flex; align-items: center; padding: 8px 0; color: white; font-weight: 700; font-size: 16px; border-bottom: 1px solid #9dbb8f;">
                                <div
                                    style="flex-shrink: 0; width: 32px; height: 32px; background-color: #f9f9a7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                                        class="svg-inline--fa fa-check" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: #065014;">
                                        <path
                                            d="M173.898 439.404l-166.4-166.4c-12.497-12.497-12.497-32.758 0-45.255l45.255-45.255c12.497-12.497 32.758-12.497 45.255 0L192 312.69 432.345 72.344c12.497-12.497 32.758-12.497 45.255 0l45.255 45.255c12.497 12.497 12.497 32.758 0 45.255l-294.4 294.4c-12.497 12.497-32.758 12.497-45.255 0z">
                                        </path>
                                    </svg>
                                </div>
                                ফিট বডি ও মাসল গঠনে সহায়ক
                            </li>
                            <li
                                style="display: flex; align-items: center; padding: 8px 0; color: white; font-weight: 700; font-size: 16px;">
                                <div
                                    style="flex-shrink: 0; width: 32px; height: 32px; background-color: #f9f9a7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check"
                                        class="svg-inline--fa fa-check" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: #065014;">
                                        <path
                                            d="M173.898 439.404l-166.4-166.4c-12.497-12.497-12.497-32.758 0-45.255l45.255-45.255c12.497-12.497 32.758-12.497 45.255 0L192 312.69 432.345 72.344c12.497-12.497 32.758-12.497 45.255 0l45.255 45.255c12.497 12.497 12.497 32.758 0 45.255l-294.4 294.4c-12.497 12.497-32.758 12.497-45.255 0z">
                                        </path>
                                    </svg>
                                </div>
                                স্ট্যামিনা ও রোগ প্রতিরোধ ক্ষমতা বাড়ায়
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="btn-area" style="margin-top:8px;">
                    <a id="link" href="#payment" class="cta-button link" style="text-decoration: none" type="button">
                        <svg width="30px" height="27px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16"
                                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </g>
                        </svg>
                        অর্ডার করতে চাই
                    </a>
                </div>
            </div>
        </div>
        <!-- gfdsgdadsgsdgdgdsfgdsfgdsfgd -->

        <!-- Special ingredients section -->
        <div class="container">

            <div class="protein-bar">
                প্রোটিন পাউডারের - <span class="yellow">বিশেষ উপাদানসমূহ</span>
            </div>

            <div class="special-ingredients">
                <div class="grid" aria-label="প্রোটিন পাউডারের বিশেষ উপাদানসমূহ">
                    <div class="grid-item">
                        <img src="https://cdn.saleecom.com/upload/images/6890b68fa17da487d49d7d6f/trifola-42ac.webp"
                            alt="ত্রিফলা ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">ত্রিফলা</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://storage.googleapis.com/a1aa/image/e1a889a0-7b22-4d90-6e62-1ca42a53bfb0.jpg"
                            alt="অমলকী ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">অমলকী</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://cdn.saleecom.com/upload/images/6890b68fa17da487d49d7d6f/shotomul-6f10d.webp"
                            alt="শতদল ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">শতমুল</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://cdn.saleecom.com/upload/images/6890b68fa17da487d49d7d6f/arjun-2fe6.webp"
                            alt="আদ্রক ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">অর্জুন</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://cdn.saleecom.com/upload/images/6890b68fa17da487d49d7d6f/kalojira-6511.webp"
                            alt="কালোজিরা ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">কালোজিরা</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://cdn.saleecom.com/upload/images/6890b68fa17da487d49d7d6f/kathbadam-348e.webp"
                            alt="কাঠবাদাম ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">কাঠবাদাম</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://cdn.saleecom.com/upload/images/6890b68fa17da487d49d7d6f/pudina-pata-c93c.webp"
                            alt="পুদিনা পাতা ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">পুদিনা পাতা</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://storage.googleapis.com/a1aa/image/9895ae10-c336-468c-f974-46e677234524.jpg"
                            alt="মিষ্টান্ন মূল ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">মিষ্টান্ন মূল</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://cdn.saleecom.com/upload/images/6890b68fa17da487d49d7d6f/shila-dut-847c.webp"
                            alt="শিলাদ্রুত ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">শিলাদুত</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://cdn.saleecom.com/upload/images/6890b68fa17da487d49d7d6f/talmul-46410.webp"
                            alt="তালমূল ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">তালমুল</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://cdn.saleecom.com/upload/images/6890b68fa17da487d49d7d6f/kishore-7645.webp"
                            alt="কিসমিস ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">কিশর</div>
                        <div class="last-div"></div>
                    </div>
                    <div class="grid-item">
                        <img src="https://cdn.saleecom.com/upload/images/6890b68fa17da487d49d7d6f/bohera-a7c5.webp"
                            alt="বাহারা ছবি - প্রোটিন পাউডারের বিশেষ উপাদান" />
                        <div class="div">বহেরা</div>
                        <div class="last-div"></div>
                    </div>
                </div>
                <p style="text-align:center; color:#000000; font-size:20px; font-weight: 700; margin-top:8px; margin-bottom:0;">
                    এগুলোয় রয়েছে আরো কিছু গুণগত উপাদান।
                </p>

                <div class="btn-area" style="margin-top:8px;">
                    <a id="link" href="#payment" class="cta-button link" style="text-decoration: none" type="button">
                        <svg width="30px" height="27px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16"
                                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </g>
                        </svg>
                        অর্ডার করতে চাই
                    </a>
                </div>

            </div>
        </div>
        <!-- Service note with green background and white text -->
        <div class="service-note-section">
            <div class="container"
                style="position: absolute; z-index: 9999; width: 100%; top: 12%; left: 50%; transform: translate(-50%, -50%);">
                <div class="service-note mob-service-note">
                    সেবনের নিয়ম:
                </div>
            </div>
            <svg class="first-wave" style="fill: #ffffff;transform: scale(1.2);" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 283.5 27.8" preserveAspectRatio="none">
                <path class="elementor-shape-fill"
                    d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7\ts-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7\tc-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3\tc-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6\tc0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7\tC239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5\tc0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1\tc-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7\tc0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6\tC8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8\tc0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2\tC74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3\tC97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1\tz M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1\tc-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z">
                </path>
                <path class="elementor-shape-fill"
                    d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3\tC267.7,18.8,269.7,18,269.6,18z">
                </path>
                <path class="elementor-shape-fill"
                    d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2\tS227.6,9.9,227.4,9.8z">
                </path>
                <path class="elementor-shape-fill"
                    d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4\tC206.4,12.9,204.6,13.5,204.5,13.4z">
                </path>
                <path class="elementor-shape-fill"
                    d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6\tS201,10.7,201,10.6z">
                </path>
                <path class="elementor-shape-fill"
                    d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3\tC152.6,27.5,154.6,26.8,154.5,26.7z">
                </path>
                <path class="elementor-shape-fill"
                    d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6\tc-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z">
                </path>
                <path class="elementor-shape-fill"
                    d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0\tC76.9,11.5,75.3,12.5,75.5,12.6z">
                </path>
                <path class="elementor-shape-fill"
                    d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4\tC19.9,13.7,15.7,13.3,15.6,13.2z">
                </path>
            </svg>

            <svg class="second-wave" style="fill: #ffffff;transform: rotate(180deg)" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1047.1 3.7" preserveAspectRatio="xMidYMin slice">
                <path class="elementor-shape-fill"
                    d="M1047.1,0C557,0,8.9,0,0,0v1.6c0,0,0.6-1.5,2.7-0.3C3.9,2,6.1,4.1,8.3,3.5c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3C13.8,2,16,4.1,18.2,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C23.6,2,25.9,4.1,28,3.5c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C63,2,65.3,4.1,67.4,3.5\tC68.3,3.3,69,1.6,69,1.6s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tC82.7,2,85,4.1,87.1,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C92.6,2,94.8,4.1,97,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.6-0.4V0z M2.5,1.2C2.5,1.2,2.5,1.2,2.5,1.2C2.5,1.2,2.5,1.2,2.5,1.2z M2.7,1.4c0.1,0,0.1,0.1,0.1,0.1C2.8,1.4,2.8,1.4,2.7,1.4z">
                </path>
            </svg>

            <div class="morning-btn">
                <div class="morning-text">সকালে ও রাতে ১ গ্লাস পানিতে ১ চামচ পাউডার মিশিয়ে সেবন করবেন। (খাওয়ার পুর্বে)
                </div>
                <div class="btn-area" style="margin-top:8px;">
                    <a id="link" href="#payment" class="cta-button link" style="text-decoration: none" type="button">
                        <svg width="30px" height="27px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M20 10H18M20 10H21M4 10H3M4 10H6M6 10H18M6 10L9 4M18 10L15 4M9 13V16M12 13V16M15 13V16"
                                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </g>
                        </svg>
                        অর্ডার করতে চাই
                    </a>
                </div>
            </div>
        </div>





        <!-- Customer review section -->
        <!-- <div class="container">
            <div class="customer-review-header">কাস্টমার রিভিউ</div>
        </div>
        <div class="container">
            <div class="customer-review-img">
                <img src="https://storage.googleapis.com/a1aa/image/c6521b58-662d-4783-9914-158a2e3eb6ee.jpg"
                    alt="কাস্টমার রিভিউ স্ক্রিনশট ৩টি সাইড বাই সাইড" />
            </div>
        </div> -->



        <!-- Contact call to action -->
        <div class="container">
            <div class="contact-cta">
                <p>যেকোন প্রয়োজনে কল করুন</p>
                <a  id="phone" href="tel:+8801850373616" style="background: #3708AA" target="_blank" rel="noopener noreferrer" class="contact-whatsapp w-250">
                    <svg class="phone-call-svg" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512">
                        <path fill="#ffffff"
                            d="M97.333 506.966c-129.874-129.874-129.681-340.252 0-469.933 5.698-5.698 14.527-6.632 21.263-2.422l64.817 40.513a17.187 17.187 0 0 1 6.849 20.958l-32.408 81.021a17.188 17.188 0 0 1-17.669 10.719l-55.81-5.58c-21.051 58.261-20.612 122.471 0 179.515l55.811-5.581a17.188 17.188 0 0 1 17.669 10.719l32.408 81.022a17.188 17.188 0 0 1-6.849 20.958l-64.817 40.513a17.19 17.19 0 0 1-21.264-2.422zM247.126 95.473c11.832 20.047 11.832 45.008 0 65.055-3.95 6.693-13.108 7.959-18.718 2.581l-5.975-5.726c-3.911-3.748-4.793-9.622-2.261-14.41a32.063 32.063 0 0 0 0-29.945c-2.533-4.788-1.65-10.662 2.261-14.41l5.975-5.726c5.61-5.378 14.768-4.112 18.718 2.581zm91.787-91.187c60.14 71.604 60.092 175.882 0 247.428-4.474 5.327-12.53 5.746-17.552.933l-5.798-5.557c-4.56-4.371-4.977-11.529-.93-16.379 49.687-59.538 49.646-145.933 0-205.422-4.047-4.85-3.631-12.008.93-16.379l5.798-5.557c5.022-4.813 13.078-4.394 17.552.933zm-45.972 44.941c36.05 46.322 36.108 111.149 0 157.546-4.39 5.641-12.697 6.251-17.856 1.304l-5.818-5.579c-4.4-4.219-4.998-11.095-1.285-15.931 26.536-34.564 26.534-82.572 0-117.134-3.713-4.836-3.115-11.711 1.285-15.931l5.818-5.579c5.159-4.947 13.466-4.337 17.856 1.304z" />
                    </svg>

                    01850373616</a>
                    <br />
                <a id="phone" href="https://wa.me/+8801850373616" target="_blank" rel="noopener noreferrer" class="contact-whatsapp">
                    <svg class="phone-call-svg" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512">
                        <path fill="#ffffff"
                            d="M97.333 506.966c-129.874-129.874-129.681-340.252 0-469.933 5.698-5.698 14.527-6.632 21.263-2.422l64.817 40.513a17.187 17.187 0 0 1 6.849 20.958l-32.408 81.021a17.188 17.188 0 0 1-17.669 10.719l-55.81-5.58c-21.051 58.261-20.612 122.471 0 179.515l55.811-5.581a17.188 17.188 0 0 1 17.669 10.719l32.408 81.022a17.188 17.188 0 0 1-6.849 20.958l-64.817 40.513a17.19 17.19 0 0 1-21.264-2.422zM247.126 95.473c11.832 20.047 11.832 45.008 0 65.055-3.95 6.693-13.108 7.959-18.718 2.581l-5.975-5.726c-3.911-3.748-4.793-9.622-2.261-14.41a32.063 32.063 0 0 0 0-29.945c-2.533-4.788-1.65-10.662 2.261-14.41l5.975-5.726c5.61-5.378 14.768-4.112 18.718 2.581zm91.787-91.187c60.14 71.604 60.092 175.882 0 247.428-4.474 5.327-12.53 5.746-17.552.933l-5.798-5.557c-4.56-4.371-4.977-11.529-.93-16.379 49.687-59.538 49.646-145.933 0-205.422-4.047-4.85-3.631-12.008.93-16.379l5.798-5.557c5.022-4.813 13.078-4.394 17.552.933zm-45.972 44.941c36.05 46.322 36.108 111.149 0 157.546-4.39 5.641-12.697 6.251-17.856 1.304l-5.818-5.579c-4.4-4.219-4.998-11.095-1.285-15.931 26.536-34.564 26.534-82.572 0-117.134-3.713-4.836-3.115-11.711 1.285-15.931l5.818-5.579c5.159-4.947 13.466-4.337 17.856 1.304z" />
                    </svg>

                    WhatsApp</a>
            </div>
        </div>
        <!-- Footer -->
        <footer>
            © 2025 RM Life BD. All Rights Reserved. Designed By
            <a href="https://rmlifebd.com" target="_blank" rel="noopener noreferrer">RM LIFE BD</a>
        </footer>
    </div>
</body>

</html>
        `
      },

      {
        _id:'56745675456',
        image: '/assets/page/tem4.png',
        name: 'Natural Powder',
        link: '/assets/page/landing-page2.html',
        theme: `
<html lang="en-US" class="no-js">
<head>
\t<meta charset="UTF-8">
\t<meta name="viewport" content="width=device-width, initial-scale=1">
\t<link rel="profile" href="http://gmpg.org/xfn/11">
\t<meta name="viewport" content="width=device-width, initial-scale=1" />
\t<style>img:is([sizes="auto" i], [sizes^="auto," i]) { contain-intrinsic-size: 3000px 1500px }</style>

<title>Rafza Pure</title>
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/cart-frontend.js?ver=5cdb1d1a64b214b59985' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/wc-cart-checkout-base-frontend.js?ver=e4e433ec1187f2d5da6e' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/vendor/wp-polyfill.min.js?ver=3.15.0' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/i18n.min.js?ver=5e580eb46a90c2b997e6' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/hooks.min.js?ver=4d63a3d491d11ffd8ac6' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/wc-cart-checkout-vendors-frontend.js?ver=c939a893efb4febadc26' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/vendor/react.min.js?ver=18.3.1.1' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/vendor/react-jsx-runtime.min.js?ver=18.3.1' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/blocks-checkout.js?ver=a1c2e7c31247ee1ae717' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/vendor/react-dom.min.js?ver=18.3.1.1' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/blocks-components.js?ver=14f739e1c451e591f9da' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks-data.js?ver=330a6892721994aa0779' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/blocks-checkout-events.js?ver=2d0fd4590f6cc663947c' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/wc-types.js?ver=35dee88875b85ff65531' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks-registry.js?ver=a16aa912ffa0a15063f1' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/wc-settings.js?ver=508473c3c2ece9af8f8f' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/api-fetch.min.js?ver=3623a576c78df404ff20' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/url.min.js?ver=c2964167dfe2477c14ea' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/data.min.js?ver=fe6c4835cd00e12493c3' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/compose.min.js?ver=84bcf832a5c99203f3db' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/deprecated.min.js?ver=e1f84915c5e8ae38964c' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/dom.min.js?ver=80bd57c84b45cf04f4ce' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/element.min.js?ver=a4eeeadd23c0d7ab1d2d' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/escape-html.min.js?ver=6561a406d2d232a6fbd2' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/is-shallow-equal.min.js?ver=e0f9f1d78d83f5196979' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/keycodes.min.js?ver=034ff647a54b018581d3' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/priority-queue.min.js?ver=9c21c957c7e50ffdbf48' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/private-apis.min.js?ver=0f8478f1ba7e0eea562b' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/redux-routine.min.js?ver=8bb92d45458b29590f53' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/data-controls.min.js?ver=49f5587e8b90f9e7cc7e' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/html-entities.min.js?ver=2cd3358363e0675638fb' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/notices.min.js?ver=673a68a7ac2f556ed50b' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks-middleware.js?ver=d79dedade2f2e4dc9df4' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/a11y.min.js?ver=3156534cc54473497e14' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/dom-ready.min.js?ver=f77871ff7694fffea381' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/primitives.min.js?ver=aef2543ab60c8c9bb609' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/warning.min.js?ver=ed7c8b0940914f4fe44b' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks-shared-context.js?ver=5afd527de106cd5139ef' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks-shared-hocs.js?ver=a1c1ed405307cfa86966' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/price-format.js?ver=57e176e7cc02bdd27978' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/autop.min.js?ver=9fb50649848277dd318d' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/plugins.min.js?ver=20303a2de19246c83e5a' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/style-engine.min.js?ver=08cc10e9532531e22456' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/wordcount.min.js?ver=55d8c2bf3dc99e7ea5ec' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/client/blocks/checkout-frontend.js?ver=b23bf6cce0c518cb3c72' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/components.min.js?ver=865f2ec3b5f5195705e0' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/date.min.js?ver=85ff222add187a4e358f' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/vendor/moment.min.js?ver=2.30.1' as='script' rel='prefetch' />
<link href='https://rafzapure.shop/wp-includes/js/dist/rich-text.min.js?ver=74178fc8c4d67d66f1a8' as='script' rel='prefetch' />
<link rel="alternate" type="application/rss+xml" title="Rafza Pure &raquo; Feed" href="https://rafzapure.shop/feed/" />
<link rel="alternate" type="application/rss+xml" title="Rafza Pure &raquo; Comments Feed" href="https://rafzapure.shop/comments/feed/" />

<style id='wp-emoji-styles-inline-css'>

\timg.wp-smiley, img.emoji {
\t\tdisplay: inline !important;
\t\tborder: none !important;
\t\tbox-shadow: none !important;
\t\theight: 1em !important;
\t\twidth: 1em !important;
\t\tmargin: 0 0.07em !important;
\t\tvertical-align: -0.1em !important;
\t\tbackground: none !important;
\t\tpadding: 0 !important;
\t}
</style>

<link rel='stylesheet' id='CF_block-cartflows-style-css-css' href='https://rafzapure.shop/wp-content/plugins/cartflows/modules/gutenberg/build/style-blocks.css?ver=2.1.14' media='all' />
<link rel='stylesheet' id='CFP_block-cfp-style-css-css' href='https://rafzapure.shop/wp-content/plugins/cartflows-pro/modules/gutenberg/build/style-blocks.css?ver=2.0.6' media='all' />

<style id='wp-block-template-skip-link-inline-css'>

\t\t.skip-link.screen-reader-text {
\t\t\tborder: 0;
\t\t\tclip-path: inset(50%);
\t\t\theight: 1px;
\t\t\tmargin: -1px;
\t\t\toverflow: hidden;
\t\t\tpadding: 0;
\t\t\tposition: absolute !important;
\t\t\twidth: 1px;
\t\t\tword-wrap: normal !important;
\t\t}

\t\t.skip-link.screen-reader-text:focus {
\t\t\tbackground-color: #eee;
\t\t\tclip-path: none;
\t\t\tcolor: #444;
\t\t\tdisplay: block;
\t\t\tfont-size: 1em;
\t\t\theight: auto;
\t\t\tleft: 5px;
\t\t\tline-height: normal;
\t\t\tpadding: 15px 23px 14px;
\t\t\ttext-decoration: none;
\t\t\ttop: 5px;
\t\t\twidth: auto;
\t\t\tz-index: 100000;
\t\t}
\t\t.video-container {
            margin-top: 8px;
            // border: 3px solid red;
            overflow: hidden;
            max-width: 100%;
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
        }

        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        .elementor-widget-button{
text-align: center;
            padding: 15px;
            margin-top: 40px;
            display: flex;
            justify-content: center;
        }
        .elementor-button {
    background-color: #FF0000;
    font-family: "Hind Siliguri", Sans-serif;
    font-size: 19px;
    font-weight: 700;
    fill: #FFFFFF;
    color: #FFFFFF;
    border-style: solid;
    border-color: #FFFFFF;
    border-radius: 9px 9px 9px 9px;
}
.elementor-button-content-wrapper {
    display: flex;
    flex-direction: row;
    gap: 5px;
    justify-content: center;
}
</style>
<link rel='stylesheet' id='select2-css' href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/css/select2.css?ver=10.2.1' media='all' />
<link rel='stylesheet' id='woocommerce-layout-css' href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/css/woocommerce-layout.css?ver=10.2.1' media='all' />
<link rel='stylesheet' id='woocommerce-smallscreen-css' href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/css/woocommerce-smallscreen.css?ver=10.2.1' media='only screen and (max-width: 768px)' />
<link rel='stylesheet' id='woocommerce-general-css' href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/css/woocommerce.css?ver=10.2.1' media='all' />
<style id='woocommerce-inline-inline-css'>
.woocommerce form .form-row .required { visibility: visible; }
</style>
<link rel='stylesheet' id='brands-styles-css' href='https://rafzapure.shop/wp-content/plugins/woocommerce/assets/css/brands.css?ver=10.2.1' media='all' />
<link rel='stylesheet' id='wcf-normalize-frontend-global-css' href='https://rafzapure.shop/wp-content/plugins/cartflows/assets/css/cartflows-normalize.css?ver=2.1.14' media='all' />
<link rel='stylesheet' id='wcf-frontend-global-css' href='https://rafzapure.shop/wp-content/plugins/cartflows/assets/css/frontend.css?ver=2.1.14' media='all' />
<style id='wcf-frontend-global-inline-css'>
:root { --e-global-color-wcfgcpprimarycolor: #f16334; --e-global-color-wcfgcpsecondarycolor: #000000; --e-global-color-wcfgcptextcolor: #4B5563; --e-global-color-wcfgcpaccentcolor: #1F2937;  }
</style>
<link rel='stylesheet' id='wcf-pro-frontend-global-css' href='https://rafzapure.shop/wp-content/plugins/cartflows-pro/assets/css/frontend.css?ver=2.0.6' media='all' />
<link rel='stylesheet' id='elementor-frontend-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/css/frontend.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='elementor-post-6-css' href='https://rafzapure.shop/wp-content/uploads/elementor/css/post-6.css?ver=1758692113' media='all' />
<link rel='stylesheet' id='elementor-pro-css' href='https://rafzapure.shop/wp-content/plugins/elementor-pro/assets/css/frontend.min.css?ver=3.24.3' media='all' />
<link rel='stylesheet' id='widget-heading-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/css/widget-heading.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='widget-image-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/css/widget-image.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='e-animation-grow-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/lib/animations/styles/e-animation-grow.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='e-animation-bounceIn-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/lib/animations/styles/bounceIn.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='widget-video-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/css/widget-video.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='widget-spacer-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/css/widget-spacer.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='e-shapes-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/css/conditionals/shapes.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='widget-icon-list-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/css/widget-icon-list.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='e-animation-pulse-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/lib/animations/styles/e-animation-pulse.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='e-animation-fadeInUp-css' href='https://rafzapure.shop/wp-content/plugins/elementor/assets/lib/animations/styles/fadeInUp.min.css?ver=3.32.2' media='all' />
<link rel='stylesheet' id='elementor-post-21-css' href='https://rafzapure.shop/wp-content/uploads/elementor/css/post-21.css?ver=1758730272' media='all' />
<link rel='stylesheet' id='wcf-checkout-template-css' href='https://rafzapure.shop/wp-content/plugins/cartflows/assets/css/checkout-template.css?ver=2.1.14' media='all' />
<style id='wcf-checkout-template-inline-css'>

\t\t\t.wcf-embed-checkout-form .woocommerce #payment #place_order:before{
\t\t\t\tcontent: "\\e902";
\t\t\t\tfont-family: "cartflows-icon" !important;
\t\t\t\tmargin-right: 10px;
\t\t\t\tfont-size: 16px;
\t\t\t\tfont-weight: 500;
\t\t\t\ttop: 0px;
    \t\t\tposition: relative;
\t\t\t\topacity: 1;
\t\t\t\tdisplay: block;
\t\t\t}
</style>
<link rel='stylesheet' id='wcf-pro-checkout-css' href='https://rafzapure.shop/wp-content/plugins/cartflows-pro/assets/css/checkout-styles.css?ver=2.0.6' media='all' />
<link rel='stylesheet' id='wcf-pro-multistep-checkout-css' href='https://rafzapure.shop/wp-content/plugins/cartflows-pro/assets/css/multistep-checkout.css?ver=2.0.6' media='all' />
<link rel='stylesheet' id='dashicons-css' href='https://rafzapure.shop/wp-includes/css/dashicons.min.css?ver=6.8.2' media='all' />
<link rel='stylesheet' id='elementor-gf-roboto-css' href='https://fonts.googleapis.com/css?family=Roboto:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&#038;display=swap' media='all' />
<link rel='stylesheet' id='elementor-gf-robotoslab-css' href='https://fonts.googleapis.com/css?family=Roboto+Slab:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&#038;display=swap' media='all' />
<link rel='stylesheet' id='elementor-gf-hindsiliguri-css' href='https://fonts.googleapis.com/css?family=Hind+Siliguri:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&#038;display=swap' media='all' />
<link rel='stylesheet' id='elementor-gf-tirobangla-css' href='https://fonts.googleapis.com/css?family=Tiro+Bangla:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&#038;display=swap' media='all' />
<link rel='stylesheet' id='elementor-gf-anekbangla-css' href='https://fonts.googleapis.com/css?family=Anek+Bangla:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&#038;display=swap' media='all' />
<script src="https://rafzapure.shop/wp-includes/js/jquery/jquery.min.js?ver=3.7.1" id="jquery-core-js"></script>
<script src="https://rafzapure.shop/wp-includes/js/jquery/jquery-migrate.min.js?ver=3.4.1" id="jquery-migrate-js"></script>
<script src="https://rafzapure.shop/wp-content/plugins/woocommerce/assets/js/jquery-blockui/jquery.blockUI.min.js?ver=2.7.0-wc.10.2.1" id="jquery-blockui-js" defer data-wp-strategy="defer"></script>
<script id="wc-add-to-cart-js-extra">
var wc_add_to_cart_params = {"ajax_url":"\\/wp-admin\\/admin-ajax.php","wc_ajax_url":"\\/?wc-ajax=%%endpoint%%&wcf_checkout_id=21","i18n_view_cart":"View cart","cart_url":"https:\\/\\/rafzapure.shop\\/cart\\/","is_cart":"","cart_redirect_after_add":"no"};
</script>
<script src="https://rafzapure.shop/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.min.js?ver=10.2.1" id="wc-add-to-cart-js" defer data-wp-strategy="defer"></script>
<script src="https://rafzapure.shop/wp-content/plugins/woocommerce/assets/js/selectWoo/selectWoo.full.min.js?ver=1.0.9-wc.10.2.1" id="selectWoo-js" defer data-wp-strategy="defer"></script>
<script id="zxcvbn-async-js-extra">
var _zxcvbnSettings = {"src":"https:\\/\\/rafzapure.shop\\/wp-includes\\/js\\/zxcvbn.min.js"};
</script>
<script src="https://rafzapure.shop/wp-includes/js/zxcvbn-async.min.js?ver=1.0" id="zxcvbn-async-js"></script>
<script src="https://rafzapure.shop/wp-includes/js/dist/hooks.min.js?ver=4d63a3d491d11ffd8ac6" id="wp-hooks-js"></script>
<script src="https://rafzapure.shop/wp-includes/js/dist/i18n.min.js?ver=5e580eb46a90c2b997e6" id="wp-i18n-js"></script>
<script id="wp-i18n-js-after">
wp.i18n.setLocaleData( { 'text direction\u0004ltr': [ 'ltr' ] } );
</script>
<script id="password-strength-meter-js-extra">
var pwsL10n = {"unknown":"Password strength unknown","short":"Very weak","bad":"Weak","good":"Medium","strong":"Strong","mismatch":"Mismatch"};
</script>
<script src="https://rafzapure.shop/wp-admin/js/password-strength-meter.min.js?ver=6.8.2" id="password-strength-meter-js"></script>
<script id="wc-password-strength-meter-js-extra">
var wc_password_strength_meter_params = {"min_password_strength":"3","stop_checkout":"","i18n_password_error":"Please enter a stronger password.","i18n_password_hint":"Hint: The password should be at least twelve characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! \\" ? $ % ^ & )."};
</script>
<script src="https://rafzapure.shop/wp-content/plugins/woocommerce/assets/js/frontend/password-strength-meter.min.js?ver=10.2.1" id="wc-password-strength-meter-js" defer data-wp-strategy="defer"></script>
<script src="https://rafzapure.shop/wp-content/plugins/woocommerce/assets/js/js-cookie/js.cookie.min.js?ver=2.1.4-wc.10.2.1" id="js-cookie-js" defer data-wp-strategy="defer"></script>
<script id="woocommerce-js-extra">
var woocommerce_params = {"ajax_url":"\\/wp-admin\\/admin-ajax.php","wc_ajax_url":"\\/?wc-ajax=%%endpoint%%&wcf_checkout_id=21","i18n_password_show":"Show password","i18n_password_hide":"Hide password"};
</script>
<script src="https://rafzapure.shop/wp-content/plugins/woocommerce/assets/js/frontend/woocommerce.min.js?ver=10.2.1" id="woocommerce-js" defer data-wp-strategy="defer"></script>
<script id="wc-country-select-js-extra">
var wc_country_select_params = {"countries":"{\\"BD\\":{\\"BD-05\\":\\"Bagerhat\\",\\"BD-01\\":\\"Bandarban\\",\\"BD-02\\":\\"Barguna\\",\\"BD-06\\":\\"Barishal\\",\\"BD-07\\":\\"Bhola\\",\\"BD-03\\":\\"Bogura\\",\\"BD-04\\":\\"Brahmanbaria\\",\\"BD-09\\":\\"Chandpur\\",\\"BD-10\\":\\"Chattogram\\",\\"BD-12\\":\\"Chuadanga\\",\\"BD-11\\":\\"Cox's Bazar\\",\\"BD-08\\":\\"Cumilla\\",\\"BD-13\\":\\"Dhaka\\",\\"BD-14\\":\\"Dinajpur\\",\\"BD-15\\":\\"Faridpur \\",\\"BD-16\\":\\"Feni\\",\\"BD-19\\":\\"Gaibandha\\",\\"BD-18\\":\\"Gazipur\\",\\"BD-17\\":\\"Gopalganj\\",\\"BD-20\\":\\"Habiganj\\",\\"BD-21\\":\\"Jamalpur\\",\\"BD-22\\":\\"Jashore\\",\\"BD-25\\":\\"Jhalokati\\",\\"BD-23\\":\\"Jhenaidah\\",\\"BD-24\\":\\"Joypurhat\\",\\"BD-29\\":\\"Khagrachhari\\",\\"BD-27\\":\\"Khulna\\",\\"BD-26\\":\\"Kishoreganj\\",\\"BD-28\\":\\"Kurigram\\",\\"BD-30\\":\\"Kushtia\\",\\"BD-31\\":\\"Lakshmipur\\",\\"BD-32\\":\\"Lalmonirhat\\",\\"BD-36\\":\\"Madaripur\\",\\"BD-37\\":\\"Magura\\",\\"BD-33\\":\\"Manikganj \\",\\"BD-39\\":\\"Meherpur\\",\\"BD-38\\":\\"Moulvibazar\\",\\"BD-35\\":\\"Munshiganj\\",\\"BD-34\\":\\"Mymensingh\\",\\"BD-48\\":\\"Naogaon\\",\\"BD-43\\":\\"Narail\\",\\"BD-40\\":\\"Narayanganj\\",\\"BD-42\\":\\"Narsingdi\\",\\"BD-44\\":\\"Natore\\",\\"BD-45\\":\\"Nawabganj\\",\\"BD-41\\":\\"Netrakona\\",\\"BD-46\\":\\"Nilphamari\\",\\"BD-47\\":\\"Noakhali\\",\\"BD-49\\":\\"Pabna\\",\\"BD-52\\":\\"Panchagarh\\",\\"BD-51\\":\\"Patuakhali\\",\\"BD-50\\":\\"Pirojpur\\",\\"BD-53\\":\\"Rajbari\\",\\"BD-54\\":\\"Rajshahi\\",\\"BD-56\\":\\"Rangamati\\",\\"BD-55\\":\\"Rangpur\\",\\"BD-58\\":\\"Satkhira\\",\\"BD-62\\":\\"Shariatpur\\",\\"BD-57\\":\\"Sherpur\\",\\"BD-59\\":\\"Sirajganj\\",\\"BD-61\\":\\"Sunamganj\\",\\"BD-60\\":\\"Sylhet\\",\\"BD-63\\":\\"Tangail\\",\\"BD-64\\":\\"Thakurgaon\\"}}","i18n_select_state_text":"Select an option\u2026","i18n_no_matches":"No matches found","i18n_ajax_error":"Loading failed","i18n_input_too_short_1":"Please enter 1 or more characters","i18n_input_too_short_n":"Please enter %qty% or more characters","i18n_input_too_long_1":"Please delete 1 character","i18n_input_too_long_n":"Please delete %qty% characters","i18n_selection_too_long_1":"You can only select 1 item","i18n_selection_too_long_n":"You can only select %qty% items","i18n_load_more":"Loading more results\u2026","i18n_searching":"Searching\u2026"};
</script>
<script src="https://rafzapure.shop/wp-content/plugins/woocommerce/assets/js/frontend/country-select.min.js?ver=10.2.1" id="wc-country-select-js" defer data-wp-strategy="defer"></script>
<script id="wc-address-i18n-js-extra">
var wc_address_i18n_params = {"locale":"{\\"BD\\":{\\"postcode\\":{\\"required\\":false},\\"state\\":{\\"label\\":\\"District\\"}},\\"default\\":{\\"first_name\\":{\\"required\\":true,\\"class\\":[\\"form-row-first\\"],\\"autocomplete\\":\\"given-name\\"},\\"last_name\\":{\\"required\\":true,\\"class\\":[\\"form-row-last\\"],\\"autocomplete\\":\\"family-name\\"},\\"country\\":{\\"type\\":\\"country\\",\\"required\\":true,\\"class\\":[\\"form-row-wide\\",\\"address-field\\",\\"update_totals_on_change\\"],\\"autocomplete\\":\\"country\\"},\\"address_1\\":{\\"required\\":true,\\"class\\":[\\"form-row-wide\\",\\"address-field\\"],\\"autocomplete\\":\\"address-line1\\"},\\"address_2\\":{\\"label_class\\":[\\"screen-reader-text\\"],\\"class\\":[\\"form-row-wide\\",\\"address-field\\"],\\"autocomplete\\":\\"address-line2\\",\\"required\\":false},\\"city\\":{\\"required\\":true,\\"class\\":[\\"form-row-wide\\",\\"address-field\\"],\\"autocomplete\\":\\"address-level2\\"},\\"state\\":{\\"type\\":\\"state\\",\\"required\\":true,\\"class\\":[\\"form-row-wide\\",\\"address-field\\"],\\"validate\\":[\\"state\\"],\\"autocomplete\\":\\"address-level1\\"},\\"postcode\\":{\\"required\\":true,\\"class\\":[\\"form-row-wide\\",\\"address-field\\"],\\"validate\\":[\\"postcode\\"],\\"autocomplete\\":\\"postal-code\\"}}}","locale_fields":"{\\"address_1\\":\\"#billing_address_1_field, #shipping_address_1_field\\",\\"address_2\\":\\"#billing_address_2_field, #shipping_address_2_field\\",\\"state\\":\\"#billing_state_field, #shipping_state_field, #calc_shipping_state_field\\",\\"postcode\\":\\"#billing_postcode_field, #shipping_postcode_field, #calc_shipping_postcode_field\\",\\"city\\":\\"#billing_city_field, #shipping_city_field, #calc_shipping_city_field\\"}","i18n_required_text":"required","i18n_optional_text":"optional"};
</script>
<script src="https://rafzapure.shop/wp-content/plugins/woocommerce/assets/js/frontend/address-i18n.min.js?ver=10.2.1" id="wc-address-i18n-js" defer data-wp-strategy="defer"></script>
<script id="wc-checkout-js-extra">
var wc_checkout_params = {"ajax_url":"\\/wp-admin\\/admin-ajax.php","wc_ajax_url":"\\/?wc-ajax=%%endpoint%%&wcf_checkout_id=21","update_order_review_nonce":"57494dfa09","apply_coupon_nonce":"cc945558cd","remove_coupon_nonce":"0976d9b6fb","option_guest_checkout":"yes","checkout_url":"\\/?wc-ajax=checkout&wcf_checkout_id=21","is_checkout":"1","debug_mode":"","i18n_checkout_error":"There was an error processing your order. Please check for any charges in your payment method and review your <a href=\\"https:\\/\\/rafzapure.shop\\/my-account\\/orders\\/\\">order history<\\/a> before placing the order again."};
</script>
<script src="https://rafzapure.shop/wp-content/plugins/woocommerce/assets/js/frontend/checkout.min.js?ver=10.2.1" id="wc-checkout-js" defer data-wp-strategy="defer"></script>
<script src="https://rafzapure.shop/wp-content/plugins/pixelyoursite/dist/scripts/jquery.bind-first-0.2.3.min.js?ver=6.8.2" id="jquery-bind-first-js"></script>
<script src="https://rafzapure.shop/wp-content/plugins/pixelyoursite/dist/scripts/js.cookie-2.1.3.min.js?ver=2.1.3" id="js-cookie-pys-js"></script>
<script src="https://rafzapure.shop/wp-content/plugins/pixelyoursite/dist/scripts/tld.min.js?ver=2.3.1" id="js-tld-js"></script>
<script id="pys-js-extra">
var pysOptions = {"staticEvents":[],"dynamicEvents":[],"triggerEvents":[],"triggerEventTypes":[],"debug":"","siteUrl":"https:\\/\\/rafzapure.shop","ajaxUrl":"https:\\/\\/rafzapure.shop\\/wp-admin\\/admin-ajax.php","ajax_event":"34acc26ce9","enable_remove_download_url_param":"1","cookie_duration":"7","last_visit_duration":"60","enable_success_send_form":"","ajaxForServerEvent":"1","ajaxForServerStaticEvent":"1","useSendBeacon":"1","send_external_id":"1","external_id_expire":"180","track_cookie_for_subdomains":"1","google_consent_mode":"1","gdpr":{"ajax_enabled":false,"all_disabled_by_api":false,"facebook_disabled_by_api":false,"analytics_disabled_by_api":false,"google_ads_disabled_by_api":false,"pinterest_disabled_by_api":false,"bing_disabled_by_api":false,"externalID_disabled_by_api":false,"facebook_prior_consent_enabled":true,"analytics_prior_consent_enabled":true,"google_ads_prior_consent_enabled":null,"pinterest_prior_consent_enabled":true,"bing_prior_consent_enabled":true,"cookiebot_integration_enabled":false,"cookiebot_facebook_consent_category":"marketing","cookiebot_analytics_consent_category":"statistics","cookiebot_tiktok_consent_category":"marketing","cookiebot_google_ads_consent_category":"marketing","cookiebot_pinterest_consent_category":"marketing","cookiebot_bing_consent_category":"marketing","consent_magic_integration_enabled":false,"real_cookie_banner_integration_enabled":false,"cookie_notice_integration_enabled":false,"cookie_law_info_integration_enabled":false,"analytics_storage":{"enabled":true,"value":"granted","filter":false},"ad_storage":{"enabled":true,"value":"granted","filter":false},"ad_user_data":{"enabled":true,"value":"granted","filter":false},"ad_personalization":{"enabled":true,"value":"granted","filter":false}},"cookie":{"disabled_all_cookie":false,"disabled_start_session_cookie":false,"disabled_advanced_form_data_cookie":false,"disabled_landing_page_cookie":false,"disabled_first_visit_cookie":false,"disabled_trafficsource_cookie":false,"disabled_utmTerms_cookie":false,"disabled_utmId_cookie":false},"tracking_analytics":{"TrafficSource":"direct","TrafficLanding":"https:\\/\\/rafzapure.shop\\/","TrafficUtms":[],"TrafficUtmsId":[]},"GATags":{"ga_datalayer_type":"default","ga_datalayer_name":"dataLayerPYS"},"woo":{"enabled":true,"enabled_save_data_to_orders":true,"addToCartOnButtonEnabled":true,"addToCartOnButtonValueEnabled":true,"addToCartOnButtonValueOption":"price","singleProductId":null,"removeFromCartSelector":"form.woocommerce-cart-form .remove","addToCartCatchMethod":"add_cart_hook","is_order_received_page":false,"containOrderId":false},"edd":{"enabled":false},"cache_bypass":"1759144942"};
</script>
<script src="https://rafzapure.shop/wp-content/plugins/pixelyoursite/dist/scripts/public.js?ver=11.1.1" id="pys-js"></script>
<script src="https://rafzapure.shop/wp-content/plugins/woocommerce/assets/js/jquery-cookie/jquery.cookie.min.js?ver=1.4.1-wc.10.2.1" id="jquery-cookie-js" data-wp-strategy="defer"></script>
<script src="https://rafzapure.shop/wp-content/plugins/cartflows/assets/js/frontend.js?ver=2.1.14" id="wcf-frontend-global-js"></script>
<script src="https://rafzapure.shop/wp-content/plugins/cartflows-pro/assets/js/frontend.js?ver=2.0.6" id="wcf-pro-frontend-global-js"></script>
<script src="https://rafzapure.shop/wp-content/plugins/cartflows-pro/assets/js/analytics.js?ver=2.0.6" id="wcf-pro-analytics-global-js"></script>
<link rel="https://api.w.org/" href="https://rafzapure.shop/wp-json/" /><link rel="alternate" title="JSON" type="application/json" href="https://rafzapure.shop/wp-json/wp/v2/cartflows_step/21" /><link rel="EditURI" type="application/rsd+xml" title="RSD" href="https://rafzapure.shop/xmlrpc.php?rsd" />
<meta name="generator" content="WordPress 6.8.2" />
<meta name="generator" content="WooCommerce 10.2.1" />
<link rel="canonical" href="https://rafzapure.shop/step/checkout-woo/" />
<link rel='shortlink' href='https://rafzapure.shop/?p=21' />
<link rel="alternate" title="oEmbed (JSON)" type="application/json+oembed" href="https://rafzapure.shop/wp-json/oembed/1.0/embed?url=https%3A%2F%2Frafzapure.shop%2Fstep%2Fcheckout-woo%2F" />
<link rel="alternate" title="oEmbed (XML)" type="text/xml+oembed" href="https://rafzapure.shop/wp-json/oembed/1.0/embed?url=https%3A%2F%2Frafzapure.shop%2Fstep%2Fcheckout-woo%2F&#038;format=xml" />

<style class='wp-fonts-local'>
@font-face{font-family:Manrope;font-style:normal;font-weight:200 800;font-display:fallback;src:url('https://rafzapure.shop/wp-content/themes/twentytwentyfive/assets/fonts/manrope/Manrope-VariableFont_wght.woff2') format('woff2');}
@font-face{font-family:"Fira Code";font-style:normal;font-weight:300 700;font-display:fallback;src:url('https://rafzapure.shop/wp-content/themes/twentytwentyfive/assets/fonts/fira-code/FiraCode-VariableFont_wght.woff2') format('woff2');}
</style>
</head>

<body class="home wp-singular cartflows_step-template cartflows_step-template-cartflows-canvas page page-id-21 wp-embed-responsive wp-theme-twentytwentyfive theme-twentytwentyfive woocommerce-checkout woocommerce-page woocommerce-uses-block-theme woocommerce-block-theme-has-button-styles woocommerce-no-js cartflows-2.1.14  cartflows-pro-2.0.6 elementor-default elementor-kit-6 elementor-page elementor-page-21 cartflows-canvas">

\t
\t\t\t<div class="cartflows-container" >

\t\t\t<div data-elementor-type="wp-post" data-elementor-id="21" class="elementor elementor-21" data-elementor-post-type="cartflows_step">
\t\t\t\t<div class="elementor-element elementor-element-16935920 e-con-full e-flex e-con e-parent" data-id="16935920" data-element_type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;,&quot;shape_divider_top&quot;:&quot;waves-pattern&quot;,&quot;shape_divider_bottom&quot;:&quot;waves-pattern&quot;}">
\t\t\t\t<div class="elementor-shape elementor-shape-top" aria-hidden="true" data-negative="false">
\t\t\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1047.1 3.7" preserveAspectRatio="xMidYMin slice">
\t<path class="elementor-shape-fill" d="M1047.1,0C557,0,8.9,0,0,0v1.6c0,0,0.6-1.5,2.7-0.3C3.9,2,6.1,4.1,8.3,3.5c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3C13.8,2,16,4.1,18.2,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C23.6,2,25.9,4.1,28,3.5c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C63,2,65.3,4.1,67.4,3.5\tC68.3,3.3,69,1.6,69,1.6s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tC82.7,2,85,4.1,87.1,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C92.6,2,94.8,4.1,97,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.6-0.4V0z M2.5,1.2C2.5,1.2,2.5,1.2,2.5,1.2C2.5,1.2,2.5,1.2,2.5,1.2z M2.7,1.4c0.1,0,0.1,0.1,0.1,0.1C2.8,1.4,2.8,1.4,2.7,1.4z"/>
</svg>\t\t</div>
\t\t\t\t<div class="elementor-shape elementor-shape-bottom" aria-hidden="true" data-negative="false">
\t\t\t<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1047.1 3.7" preserveAspectRatio="xMidYMin slice">
\t<path class="elementor-shape-fill" d="M1047.1,0C557,0,8.9,0,0,0v1.6c0,0,0.6-1.5,2.7-0.3C3.9,2,6.1,4.1,8.3,3.5c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3C13.8,2,16,4.1,18.2,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C23.6,2,25.9,4.1,28,3.5c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C63,2,65.3,4.1,67.4,3.5\tC68.3,3.3,69,1.6,69,1.6s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tC82.7,2,85,4.1,87.1,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3C92.6,2,94.8,4.1,97,3.5c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\ts0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9\tc0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9c0,0,0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2\tc0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3c1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.7-0.3\tc1.2,0.7,3.5,2.8,5.6,2.2c0.9-0.2,1.5-1.9,1.5-1.9s0.6-1.5,2.6-0.4V0z M2.5,1.2C2.5,1.2,2.5,1.2,2.5,1.2C2.5,1.2,2.5,1.2,2.5,1.2z M2.7,1.4c0.1,0,0.1,0.1,0.1,0.1C2.8,1.4,2.8,1.4,2.7,1.4z"/>
</svg>\t\t</div>
\t\t<div class="elementor-element elementor-element-5f0217f1 e-con-full e-flex e-con e-child" data-id="5f0217f1" data-element_type="container">
\t\t\t\t<div class="elementor-element elementor-element-585f7e09 elementor-widget elementor-widget-heading" data-id="585f7e09" data-element_type="widget" data-widget_type="heading.default">
\t\t\t\t\t<h2 class="elementor-heading-title elementor-size-default"> অতৃপ্তি নয়, তৃপ্তিতেই হোক আপনার  <span style="color: red">দাম্পত্যের জয়</span> </h2>\t\t\t\t</div>
\t\t\t\t<div class="elementor-element elementor-element-a3097fb elementor-widget elementor-widget-image" data-id="a3097fb" data-element_type="widget" data-widget_type="image.default">
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img fetchpriority="high" decoding="async" width="1024" height="1024" src="https://rafzapure.shop/wp-content/uploads/2025/09/Add-a-little-bit-of-body-text-11-1024x1024.png" class="attachment-large size-large wp-image-110" alt="" srcset="https://rafzapure.shop/wp-content/uploads/2025/09/Add-a-little-bit-of-body-text-11-1024x1024.png 1024w, https://rafzapure.shop/wp-content/uploads/2025/09/Add-a-little-bit-of-body-text-11-300x300.png 300w, https://rafzapure.shop/wp-content/uploads/2025/09/Add-a-little-bit-of-body-text-11-150x150.png 150w, https://rafzapure.shop/wp-content/uploads/2025/09/Add-a-little-bit-of-body-text-11-768x768.png 768w, https://rafzapure.shop/wp-content/uploads/2025/09/Add-a-little-bit-of-body-text-11-1536x1536.png 1536w, https://rafzapure.shop/wp-content/uploads/2025/09/Add-a-little-bit-of-body-text-11-2048x2048.png 2048w, https://rafzapure.shop/wp-content/uploads/2025/09/Add-a-little-bit-of-body-text-11-600x600.png 600w, https://rafzapure.shop/wp-content/uploads/2025/09/Add-a-little-bit-of-body-text-11-100x100.png 100w" sizes="(max-width: 1024px) 100vw, 1024px" />\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>
\t\t\t\t<div class="elementor-widget-button" data-id="5af1c44" data-element_type="widget"  data-widget_type="button.default">
\t\t\t\t\t\t\t\t\t\t<a style="background: #00d084;" class="elementor-button elementor-button-link elementor-size-md elementor-animation-grow" href="#order">
\t\t\t\t\t\t<span class="elementor-button-content-wrapper">
\t\t\t\t\t\t<span class="elementor-button-icon">
\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-shopping-cart" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>\t\t\t</span>
\t\t\t\t\t\t\t\t\t<span class="elementor-button-text">অর্ডার করার আগে দয়া করে ফুল ভিডিওটা দেখুন👇</span>
\t\t\t\t\t</span>
\t\t\t\t\t</a>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t<div class="elementor-element elementor-element-249c98b elementor-widget elementor-widget-video" data-id="249c98b" data-element_type="widget" data-settings="{&quot;youtube_url&quot;:&quot;https:\\/\\/www.youtube.com\\/watch?v=XHOmBV4js_E&quot;,&quot;video_type&quot;:&quot;youtube&quot;,&quot;controls&quot;:&quot;yes&quot;}" data-widget_type="video.default">
\t\t\t\t\t\t\t<div class="elementor-wrapper elementor-open-inline">
\t\t\t<div class="elementor-video">
\t\t\t\t<div class="video-container">
\t\t\t\t\t<iframe id="video" src="https://www.youtube.com/embed/YV3ZdgSUO1M?si=N30IDR8Bu6m9s82K" frameborder="0"
\t\t\t\t\t\t\tallowfullscreen></iframe>
\t\t\t\t</div>
\t\t\t\t</div>\t\t
\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t<div class="elementor-element elementor-element-694cffa elementor-widget elementor-widget-spacer" data-id="694cffa" data-element_type="widget" data-widget_type="spacer.default">
\t\t\t\t\t\t\t<div class="elementor-spacer">
\t\t\t<div class="elementor-spacer-inner"></div>
\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t</div>
\t\t<div class="elementor-element elementor-element-e05c58d e-flex e-con-boxed e-con e-parent" data-id="e05c58d" data-element_type="container">
\t\t\t\t\t<div class="e-con-inner">
\t\t\t\t<div class="elementor-element elementor-element-4bfe0e2 elementor-widget elementor-widget-heading" data-id="4bfe0e2" data-element_type="widget" data-widget_type="heading.default">
\t\t\t\t\t<h2 class="elementor-heading-title elementor-size-default">যারা বাকিতে নিয়েছে তাদের সাক্ষীর ভিডিও✅👇</h2>\t\t\t\t</div>
\t\t\t\t<div class="elementor-element elementor-element-ec3c23a elementor-widget elementor-widget-video" data-id="ec3c23a" data-element_type="widget" data-settings="{&quot;youtube_url&quot;:&quot;https:\\/\\/youtu.be\\/z8OkZ8GFv0k?list=RDz8OkZ8GFv0k&quot;,&quot;video_type&quot;:&quot;youtube&quot;,&quot;controls&quot;:&quot;yes&quot;}" data-widget_type="video.default">
\t\t\t\t\t\t\t<div class="elementor-wrapper elementor-open-inline">
\t\t\t<div class="elementor-video">
\t\t\t\t<div class="video-container">
\t\t\t\t\t<iframe id="video" src="https://www.youtube.com/embed/YV3ZdgSUO1M?si=N30IDR8Bu6m9s82K" frameborder="0"
\t\t\t\t\t\t\tallowfullscreen></iframe>
\t\t\t\t</div>
\t\t\t</div>\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t<div class="elementor-element elementor-element-a268b1a e-flex e-con-boxed e-con e-parent" data-id="a268b1a" data-element_type="container">
\t\t\t\t\t<div class="e-con-inner">
\t\t\t\t<div class="elementor-element elementor-element-7051c24 elementor-widget elementor-widget-heading" data-id="7051c24" data-element_type="widget" data-widget_type="heading.default">
\t\t\t\t\t<h2 class="elementor-heading-title elementor-size-default">এ পর্যন্ত যারা আমাদের কাছ থেকে নি</h2>\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t<div class="elementor-element elementor-element-bf07c47 e-flex e-con-boxed e-con e-parent" data-id="bf07c47" data-element_type="container">
\t\t\t\t\t<div class="e-con-inner">
\t\t\t\t<div class="elementor-element elementor-element-1f7c165 elementor-widget elementor-widget-video" data-id="1f7c165" data-element_type="widget" data-settings="{&quot;youtube_url&quot;:&quot;https:\\/\\/www.youtube.com\\/watch?v=XHOmBV4js_E&quot;,&quot;video_type&quot;:&quot;youtube&quot;,&quot;controls&quot;:&quot;yes&quot;}" data-widget_type="video.default">
\t\t\t\t\t\t\t<div class="elementor-wrapper elementor-open-inline">
\t\t\t<div class="elementor-video">
\t\t\t\t<div class="video-container">
\t\t\t\t\t<iframe id="video" src="https://www.youtube.com/embed/YV3ZdgSUO1M?si=N30IDR8Bu6m9s82K" frameborder="0"
\t\t\t\t\t\t\tallowfullscreen></iframe>
\t\t\t\t</div>
\t\t\t</div>\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t<div class="elementor-element elementor-element-b4e38a4 e-flex e-con-boxed e-con e-parent" data-id="b4e38a4" data-element_type="container">
\t\t\t\t\t<div class="e-con-inner">
\t\t\t\t<div class="elementor-element  elementor-widget-button" data-id="a1c61fb"  >
\t\t\t\t\t\t\t\t\t\t<a style="background: #f16334;"  class="elementor-button elementor-button-link elementor-size-md elementor-animation-grow" href="#order">
\t\t\t\t\t\t<span class="elementor-button-content-wrapper">
\t\t\t\t\t\t<span class="elementor-button-icon">
\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-shopping-cart" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>\t\t\t</span>
\t\t\t\t\t\t\t\t\t<span class="elementor-button-text">অর্ডার করতে চাই</span>
\t\t\t\t\t</span>
\t\t\t\t\t</a>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t<div class="elementor-element elementor-element-a488dce e-flex e-con-boxed e-con e-parent" data-id="a488dce" data-element_type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
\t\t\t\t\t<div class="e-con-inner">
\t\t\t\t<div class="elementor-element elementor-element-aea62d8 elementor-widget elementor-widget-heading" data-id="aea62d8" data-element_type="widget" data-widget_type="heading.default">
\t\t\t\t\t<h2 class="elementor-heading-title elementor-size-default">উপকার (Benefits)</h2>\t\t\t\t</div>
\t\t\t\t<div class="elementor-element elementor-element-9316613 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="9316613" data-element_type="widget" data-widget_type="icon-list.default">
\t\t\t\t\t\t\t<ul class="elementor-icon-list-items">
\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি মার্কার+ ডাস্টার</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১২ টি এক্সট্রা বিভিন্ন কালার পেন</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি ওয়াটার পেন</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি ওয়াটার বুক</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি পিকচার ওয়াল্ড বুক ২০ পৃষ্ঠা</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি টাইপ সি ক্যাবল</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t</ul>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t<div class="elementor-element elementor-element-0f0ad14 e-flex e-con-boxed e-con e-parent" data-id="0f0ad14" data-element_type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
\t\t\t\t\t<div class="e-con-inner">
\t\t\t\t<div class="elementor-element elementor-element-18e39f7 elementor-widget elementor-widget-heading" data-id="18e39f7" data-element_type="widget" data-widget_type="heading.default">
\t\t\t\t\t<h2 class="elementor-heading-title elementor-size-default">উপকার (Benefits)</h2>\t\t\t\t</div>
\t\t\t\t<div class="elementor-element elementor-element-cf94b1b elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="cf94b1b" data-element_type="widget" data-widget_type="icon-list.default">
\t\t\t\t\t\t\t<ul class="elementor-icon-list-items">
\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি মার্কার+ ডাস্টার</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১২ টি এক্সট্রা বিভিন্ন কালার পেন</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি ওয়াটার পেন</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি ওয়াটার বুক</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি পিকচার ওয়াল্ড বুক ২০ পৃষ্ঠা</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি টাইপ সি ক্যাবল</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t</ul>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t<div class="elementor-element elementor-element-6daca26 e-flex e-con-boxed e-con e-parent" data-id="6daca26" data-element_type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
\t\t\t\t\t<div class="e-con-inner">
\t\t\t\t<div class="elementor-element elementor-element-27f0791 elementor-widget elementor-widget-heading" data-id="27f0791" data-element_type="widget" data-widget_type="heading.default">
\t\t\t\t\t<h2 class="elementor-heading-title elementor-size-default">উপকার (Benefits)</h2>\t\t\t\t</div>
\t\t\t\t<div class="elementor-element elementor-element-7ceae46 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="7ceae46" data-element_type="widget" data-widget_type="icon-list.default">
\t\t\t\t\t\t\t<ul class="elementor-icon-list-items">
\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি মার্কার+ ডাস্টার</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১২ টি এক্সট্রা বিভিন্ন কালার পেন</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি ওয়াটার পেন</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি ওয়াটার বুক</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি পিকচার ওয়াল্ড বুক ২০ পৃষ্ঠা</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি টাইপ সি ক্যাবল</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t</ul>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t<div class="elementor-element elementor-element-363ff9e e-flex e-con-boxed e-con e-parent" data-id="363ff9e" data-element_type="container" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
\t\t\t\t\t<div class="e-con-inner">
\t\t\t\t<div class="elementor-element elementor-element-e942d67 elementor-widget elementor-widget-heading" data-id="e942d67" data-element_type="widget" data-widget_type="heading.default">
\t\t\t\t\t<h2 class="elementor-heading-title elementor-size-default">উপকার (Benefits)</h2>\t\t\t\t</div>
\t\t\t\t<div class="elementor-element elementor-element-e269f47 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="e269f47" data-element_type="widget" data-widget_type="icon-list.default">
\t\t\t\t\t\t\t<ul class="elementor-icon-list-items">
\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি মার্কার+ ডাস্টার</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১২ টি এক্সট্রা বিভিন্ন কালার পেন</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি ওয়াটার পেন</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি ওয়াটার বুক</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি পিকচার ওয়াল্ড বুক ২০ পৃষ্ঠা</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t<li class="elementor-icon-list-item">
\t\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-icon">
\t\t\t\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-dot-circle" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z"></path></svg>\t\t\t\t\t\t</span>
\t\t\t\t\t\t\t\t\t\t<span class="elementor-icon-list-text">১ টি টাইপ সি ক্যাবল</span>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t</ul>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t<div class="elementor-element elementor-element-09db065 e-flex e-con-boxed e-con e-parent" data-id="09db065" data-element_type="container">
\t\t\t\t\t<div class="e-con-inner">
\t\t<div class="elementor-element elementor-element-7390650 e-con-full e-flex e-con e-child" data-id="7390650" data-element_type="container">
\t\t\t\t<div class="elementor-element elementor-element-fc9d450 elementor-widget elementor-widget-heading" data-id="fc9d450" data-element_type="widget" data-widget_type="heading.default">
\t\t\t\t\t<h2 class="elementor-heading-title elementor-size-default">যেকোনো প্রয়োজনীয় যোগাযোগ করুন</h2>\t\t\t\t</div>
\t\t\t\t<div class="elementor-element elementor-element-77fac9f elementor-align-center elementor-mobile-align-center elementor-invisible elementor-widget elementor-widget-button" data-id="77fac9f" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="button.default">
\t\t\t\t\t\t\t\t\t\t<a class="elementor-button elementor-button-link elementor-size-lg elementor-animation-pulse" href="tel:8801719912825">
\t\t\t\t\t\t<span class="elementor-button-content-wrapper">
\t\t\t\t\t\t<span class="elementor-button-icon">
\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fas-phone-alt" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>\t\t\t</span>
\t\t\t\t\t\t\t\t\t<span class="elementor-button-text">01719912825</span>
\t\t\t\t\t</span>
\t\t\t\t\t</a>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t<div class="elementor-element elementor-element-65bb31d elementor-align-center elementor-mobile-align-center elementor-invisible elementor-widget elementor-widget-button" data-id="65bb31d" data-element_type="widget" data-settings="{&quot;_animation&quot;:&quot;fadeInUp&quot;}" data-widget_type="button.default">
\t\t\t\t\t\t\t\t\t\t<a class="elementor-button elementor-button-link elementor-size-lg elementor-animation-pulse" href="http://wa.me/8801719912825">
\t\t\t\t\t\t<span class="elementor-button-content-wrapper">
\t\t\t\t\t\t<span class="elementor-button-icon">
\t\t\t\t<svg aria-hidden="true" class="e-font-icon-svg e-fab-whatsapp-square" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"></path></svg>\t\t\t</span>
\t\t\t\t\t\t\t\t\t<span class="elementor-button-text">WhatsApp</span>
\t\t\t\t\t</span>
\t\t\t\t\t</a>
\t\t\t\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
</body>

</html>
`
        },
    ]
  }



  selectTheme(theme: any) {
    this.selectedTheme = theme;
    // console.log('Selected theme:', theme);
    this.dialogRef.close(this.selectedTheme); // Send back selected theme to parent
  }


}
