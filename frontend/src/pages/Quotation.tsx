import React, { useState, useEffect } from 'react';
import { 
  User, Phone, Mail, Bike, CreditCard, Calculator, 
  Calendar, RefreshCw, HelpCircle, Send, MessageCircle, ArrowRight, ChevronDown 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Constants
const INTEREST_RATE = 10.99;
const TENURE_OPTIONS = [3, 6, 12, 18, 24, 30, 36];

const VEHICLE_DATA = [
  {
    brand: "HERO",
    models: [
      { "name": "Pleasure + LX Alloy Wheel Self Start", "price": 94185 },
      { "name": "Pleasure + VX Alloy Wheel Self Start", "price": 98064 },
      { "name": "Pleasure + XTEC Alloy Wheel Self Start", "price": 102152 },
      { "name": "Xoom 110cc VX Alloy Wheel Self Start", "price": 101191 },
      { "name": "Xoom 110cc ZX Disc Brake", "price": 106873 },
      { "name": "Destini 125 Prime Sheet Metal", "price": 97706 },
      { "name": "Destini 125 Xtec Merge Model", "price": 107452 },
      { "name": "HF-100 Alloy Wheel Kick Start", "price": 71319 },
      { "name": "HF-DELUXE Alloy Wheel Kick Start", "price": 76582 },
      { "name": "HF-DELUXE Alloy Wheel Self", "price": 83768 },
      { "name": "HF-DELUXE i3s Alloy Wheel Self", "price": 85500 },
      { "name": "HF DELUXE SELF CANVAS Alloy Wheel Self", "price": 84899 },
      { "name": "SPLENDOR PLUS OBD2 Alloy Wheel Self Start", "price": 93420 },
      { "name": "SPLENDOR PLUS 13s OBD2 Alloy Wheel Self Start", "price": 94425 },
      { "name": "SPLENDOR PLUS canvas OBD2 Alloy Wheel Self Start", "price": 94425 },
      { "name": "SPLENDOR PLUS Xtec Alloy Wheel Self Start", "price": 97382 },
      { "name": "SPLENDOR PLUS 01 Edition Alloy Wheel Self Start", "price": 96063 },
      { "name": "SPLENDOR PLUS Xtec 2.0 Alloy Wheel Self Start", "price": 100385 },
      { "name": "Passion + Alloy Wheel Self Start", "price": 96384 },
      { "name": "Super Splendor XTEC Alloy Wheel Self Start", "price": 100694 },
      { "name": "GLAMOUR XTEC DRUM BRAKE Alloy Wheel Self Start", "price": 108889 },
      { "name": "GLAMOUR XTEC DISC BRAKE Alloy Wheel Self Start", "price": 114352 },
      { "name": "X treme 125R IBS Double Disc", "price": 116322 },
      { "name": "X treme 125R ABS Double Disc", "price": 122375 },
      { "name": "XTREME 160R 4V USD Double Disc", "price": 165691 },
      { "name": "XTREME 160R 4V Flat seat Double Disc", "price": 167878 },
      { "name": "Xpulse 200T 4V Double Disc", "price": 166422 },
      { "name": "Xpulse 200 4V Double Disc", "price": 174233 },
      { "name": "Xpulse 200 4V pro Double Disc", "price": 182297 },
      { "name": "Karizma XMR Double Disc", "price": 210872 }
    ]
  },
  {
    brand: "Honda",
    models: [
      { "name": "ACTIVA Standard", "price": 97483 },
      { "name": "ACTIVA Deluxe", "price": 100207 },
      { "name": "ACTIVA SMART Smart Key", "price": 102928 },
      { "name": "DIO 110 Standard", "price": 93280 },
      { "name": "DIO 110 Deluxe", "price": 98128 },
      { "name": "DIO 110 SMART Smart Key", "price": 100850 },
      { "name": "DIO 125 Standard", "price": 104745 },
      { "name": "DIO 125 Smart Key", "price": 112260 },
      { "name": "DIO 125-Repsol Edt. Smart Key", "price": 112858 },
      { "name": "ACTIVA-125 Std-drum", "price": 103007 },
      { "name": "ACTIVA-125 Drum-Alloy", "price": 106100 },
      { "name": "ACTIVA-125 DLX-Disc-Alloy", "price": 109000 },
      { "name": "ACTIVA125 SMART Smart Key", "price": 111008 },
      { "name": "SHINE100 Self-Drum", "price": 78665 },
      { "name": "CD110 Self-Drum", "price": 89329 },
      { "name": "LIVO Self-Drum", "price": 96028 },
      { "name": "LIVO Self-Disc", "price": 100385 },
      { "name": "SHINE125 Self-Drum", "price": 97754 },
      { "name": "SHINE125 Self-Disc", "price": 102112 },
      { "name": "SP 125 Self-Drum", "price": 104770 },
      { "name": "SP 125 Self-disc", "price": 109126 },
      { "name": "UNICORN 160CC STD", "price": 134216 },
      { "name": "SP 160 std", "price": 143635 },
      { "name": "SP 160 Dual DISK", "price": 148438 },
      { "name": "HORNET 2.0 190CC", "price": 166184 },
      { "name": "CB200X 190CC", "price": 174810 }
    ]
  },
  {
    brand: "TVS",
    models: [
      { "name": "XL 100 HD Kick Start", "price": 58589 },
      { "name": "XL 100 COMFORT-ESI-TOUCH SBS", "price": 74362 },
      { "name": "XL 100 HD ES I-TOUCH SBS", "price": 71736 },
      { "name": "TVS ZEST MATT", "price": 93701 },
      { "name": "TVS JUPITER SMW", "price": 91480 },
      { "name": "TVS JUPITER AOL", "price": 95359 },
      { "name": "TVS JUPITER ZX AOL", "price": 99705 },
      { "name": "TVS JUPITER ZX AOL Smart Connect", "price": 102248 },
      { "name": "TVS JUPITER ZX DISC SmartX Connect", "price": 107215 },
      { "name": "TVS JUPITER CLASSIC DISC", "price": 107934 },
      { "name": "NEW-JUPITER 110 DRUM SMW", "price": 91912 },
      { "name": "NEW-JUPITER 110 DRUM ALLOY", "price": 96709 },
      { "name": "NEW-JUPITER 110 DRUM SXC", "price": 101125 },
      { "name": "NEW-JUPITER 110 DISC SXC", "price": 105483 },
      { "name": "TVS JUPITER 125cc ALLOY WHEEL", "price": 97099 },
      { "name": "TVS JUPITER 125cc DISC", "price": 101429 },
      { "name": "TVS JUPITER 125cc SmartX Connect", "price": 109273 },
      { "name": "TVS NTORQ 125 DISC-RACE EDT", "price": 117346 },
      { "name": "TVS NTORQ 125 DISC-RACE XP", "price": 121270 },
      { "name": "TVS NTORQ 125 DISC-RACE XT", "price": 130404 },
      { "name": "STAR CITY ES+ MWL", "price": 87139 },
      { "name": "TVS RADEON BSVI Drum-Black Edn", "price": 85522 },
      { "name": "RADEON-110 ES MAG DRUM", "price": 91225 },
      { "name": "new-RADEON-110 DIGI DRUM DUAL TONE", "price": 95665 },
      { "name": "new-RADEON-110 DIGI DISC DUAL TONE", "price": 100024 },
      { "name": "TVS STAR SPORT ELS ES MWL", "price": 77208 },
      { "name": "TVS RAIDER 125 DRUM", "price": 107326 },
      { "name": "TVS RAIDER 125 DISC SINGLE SEAT", "price": 115501 },
      { "name": "TVS RAIDER 125 DISC", "price": 117507 },
      { "name": "TVS RAIDER 125 DISC SMART CONNECT", "price": 126903 },
      { "name": "TVS RAIDER 125 DISC SUPER SQUARD", "price": 121081 },
      { "name": "new-APACHE RTR 160 FD 2V DRUM-RM", "price": 146646 },
      { "name": "new-APACHE RTR 160 RD 2V DISC-RM", "price": 150463 },
      { "name": "new- APACHE RTR 160 RD 2V DISC BT-RM", "price": 154064 },
      { "name": "APACHE RTR 160 4V RM DRUM", "price": 151457 },
      { "name": "APACHE RTR 160 4V RM DISC", "price": 155276 },
      { "name": "APACHE RTR 160 4V RM SPL EDITION", "price": 160510 },
      { "name": "APACHE RTR 160 4V DISC BT", "price": 158874 },
      { "name": "new- APACHE RTR 180 RM", "price": 160610 },
      { "name": "APACHE 200 4V 2CH ABS R-MODE", "price": 178394 },
      { "name": "TVS RONIN SS OBDIIA LIGHTNING BLACK", "price": 160589 },
      { "name": "TVS RONIN-SS OBDIIA FL RED", "price": 163314 },
      { "name": "TVS RONIN 1CH BASE +", "price": 184261 },
      { "name": "TVS RONIN 2CH MID", "price": 197626 },
      { "name": "TVS RONIN 2CH MID SPL-NIMBUS GREY", "price": 201716 },
      { "name": "RR310-OBDIIA-M23-BASE W/O QS-RAR", "price": 313327 },
      { "name": "RR310-OBDIIA-M23-BASE-RAR", "price": 331875 },
      { "name": "RR310-OBDIIA-M23-BASE-GRY", "price": 337333 },
      { "name": "RR310-OBDIIA-M23-DYN PRO-RCR TR", "price": 362420 }
    ]
  }, 
  {
    brand: "Yamaha",
    models: [
      { "name": "FASCINO DELUX DISC SE (OBD 2)", "price": 120587 },
      { "name": "FASCINO DELUX DISC (OBD 2)", "price": 117967 },
      { "name": "FASCINO DRUM (OBD 2)", "price": 104191 },
      { "name": "FASCINO DISC (OBD 2)", "price": 116710 },
      { "name": "FASCINO DRUM (OBD 2)", "price": 103171 },
      { "name": "RAYZR STREET RALLY (OBD 2) MATTE BLACK", "price": 126038 },
      { "name": "RAYZR STREET RALLY (OBD 2) MATTE COPPER", "price": 123072 },
      { "name": "RAYZR DISC DELUX (OBD 2)", "price": 119547 },
      { "name": "RAYZR DISC (OBD 2)", "price": 118304 },
      { "name": "RAYZR DRUM (OBD 2)", "price": 110540 },
      { "name": "R15 M (OBD 2)", "price": 248227 },
      { "name": "R15 V4 RACING BLUE (OBD 2)", "price": 235106 },
      { "name": "R15 V4 DARK KNIGHT (OBD 2)", "price": 230620 },
      { "name": "R15 V4 RED (OBD 2)", "price": 229485 },
      { "name": "R155", "price": 207472 },
      { "name": "MT15 V2 STD", "price": 211068 },
      { "name": "MT15 V2 (OBD 2)", "price": 216527 },
      { "name": "FZX (OBD 2) CHROME", "price": 172194 },
      { "name": "FZX (OBD 2) MATTE TITAN, MATTE BLUE", "price": 169143 },
      { "name": "FZX (OBD 2) METALLIC BLACK, MATTE COPPER, MATE BLUE  ", "price": 167900 },
      { "name": "FZ (OBD 2) METALLIC BLACK, CYAN BLUE", "price": 143442 },
      { "name": "FZS FI STD", "price": 149947 },
      { "name": "FZS FI", "price": 151295 },
      { "name": "FZS V4", "price": 159355 },
      { "name": "FZS V4 DELUX (OBD 2)", "price": 159881 }
    ]
  },
  {
    brand: "Suzuki",
    models: [
      { "name": "ACCESS DRUM CBS FI BS6", "price": 99524 },
      { "name": "ACCESS DISC CBS FI BS6", "price": 104894 },
      { "name": "ACCESS DISC CBS SP.ED FI BS6", "price": 106853 },
      { "name": "ACCESS DISC CBS SP.ED FI (BT)", "price": 111063 },
      { "name": "BURGMAN (BT)", "price": 118496 },
      { "name": "NEW GIXXER SF 150 BS6", "price": 174772 },
      { "name": "NEW GIXXER 150(NAKED) BS6", "price": 169328 },
      { "name": "GIXXER 250(NAKED) BS6", "price": 214049 },
      { "name": "V STROM SX250", "price": 245243 },
      { "name": "BURGMAN EX", "price": 136571 },
      { "name": "BURGMAN", "price": 114141 },
      { "name": "AVENIS", "price": 111644 },
      { "name": "AVENIS STD", "price": 107616 },
      { "name": "AVENIS SPL EDI", "price": 112516 }
    ] 
  },
  {
    brand: "Royal Enfield",
    models: [
      { "name": "HUNTER 350 RETRO", "price": 184017 },
      { "name": "HUNTER 350 METRO DAPPER WHITE /GREY /ORANGE / GREEN", "price": 205748 },
      { "name": "HUNTER 350 METRO REBEL BLACK/BLUE/RED", "price": 211243 },
      { "name": "BULLET 350 REBEL BLACK/BLUE/RED", "price": 210994 },
      { "name": "BULLET 350 MILITARY SILVER BLACK/SILVER RED", "price": 216977 },
      { "name": "BULLET 350 STANDARD BLACK / MAROON", "price": 237255 },
      { "name": "BULLET 350 BLACK GOLD", "price": 257457 },
      { "name": "CLASSIC 350 EFI REDDITCH RED/GREY", "price": 232463 },
      { "name": "CLASSIC 350 EFI HALCYON GREEN SC / BLACK SC", "price": 235586 },
      { "name": "CLASSIC 350 EFI HALCYON BLACK/GREEN", "price": 242374 },
      { "name": "CLASSIC 350 EFI SIGNALS DESERT SAND / MARSH GREY", "price": 255311 },
      { "name": "CLASSIC 350 EFI DARK STEALTH BLACK/GUNMETAL GREY", "price": 263162 },
      { "name": "CLASSIC 350 EFI CHROME RED/BRONZE", "price": 267215 },
      { "name": "METEOR 350 FIREBALL BLACK/RED BLUE/GREEN", "price": 246563 },
      { "name": "METEOR 350 STELLAR BLUE/RED/M. BLACK (With Tripper)", "price": 257563 },
      { "name": "METEOR 350 AURORA BLACK/GREEN/BLUE (With Tripper)", "price": 261960 },
      { "name": "METEOR 350 SUPERNOVA BLUE/RED (With Tripper)", "price": 272963 },
      { "name": "SCRAM-411 GRAPHITE YELLOW/RED/BLUE", "price": 261960 },
      { "name": "SCRAM-411 SKYLINE BLUE/BLAZING BLACK", "price": 272963 },
      { "name": "SCRAM-411 WHITE FLAME / SILVER SPIRIT", "price": 253550 },
      { "name": "HIMALAYAN 452 KAZA BROWN", "price": 343984 },
      { "name": "HIMALAYAN 452 SLATE HIMALAYAN SALT / POPPY BLUE", "price": 348393 },
      { "name": "HIMALAYAN 452 KAMET WHITE", "price": 352793 },
      { "name": "HIMALAYAN 452 HANLE BLACK", "price": 358297 },
      { "name": "INT STD INT650 CALI GREEN / CANYON RED", "price": 363139 },
      { "name": "INT CUSTOM INTERECEPTOR 650 SUNSET STRIP/BLACKPEARL", "price": 371936 },
      { "name": "INT ALLOY INT650 ALLOY BARCELONA BLUE / BLACK RAY", "price": 382929 },
      { "name": "INT SPECIAL INTERECEPTOR 650 MARK 2", "price": 393923 },
      { "name": "GT STD GT650 BRITISH GREEN / ROCKER RED", "price": 380734 },
      { "name": "GT CUSTOM CONTINENTAL GT650 DUX DELUXE", "price": 391726 },
      { "name": "GT ALLOY GT 650 ALLOY APEX GREY / SLIPSTREAM BLUE", "price": 402720 },
      { "name": "GT SPECIAL CONTINENTAL GT650 MR.CLEAN 2020", "price": 409316 },
      { "name": "SUPER METEOR 650 ASTRAL BLUE / BLACK / GREEN", "price": 432098 },
      { "name": "SUPER METEOR 650 INTERSTEALLER GREEN / GREY", "price": 448858 },
      { "name": "SUPER METEOR 650 CELESTIAL BLUE / RED", "price": 465617 }
    ]
  },
  {
    brand: "Bajaj",
    models: [
      { "name": "FREEDOM DRUM(CNG)", "price": 115656 },
      { "name": "FREEDOM LED DRUM(CNG)", "price": 126568 },
      { "name": "FREEDOM LED DISK(CNG)", "price": 132020 },
      { "name": "CT 110 X ES BS6", "price": 88163 },
      { "name": "PLATINA NEW ES BS6", "price": 86710 },
      { "name": "PLATINA 110 DRUM BS6", "price": 88648 },
      { "name": "PULSAR 125 DISK NEON", "price": 102448 },
      { "name": "PULSAR 125 UG NEW CARBON", "price": 114136 },
      { "name": "PULSAR 125 UG NEW SPLIT SEAT CARBON", "price": 118913 },
      { "name": "PULSAR 125 NS UG", "price": 132552 },
      { "name": "PULSAR 125 NS (WIDER TYER)", "price": 126951 },
      { "name": "PULSAR 125 NS UG (WINDER TYER)", "price": 132927 },
      { "name": "PULSAR 150 SD UG NEW", "price": 136858 },
      { "name": "PULSAR 150 TD UG NEW", "price": 141132 },
      { "name": "PULSAR 150 P SD", "price": 139863.9 },
      { "name": "PULSAR 150 N SD UG NEW", "price": 146601 },
      { "name": "PULSAR 150 N TD", "price": 150282 },
      { "name": "PULSAR 160 N UG", "price": 171109 },
      { "name": "PULSAR 160 NS USD UG NEW", "price": 178607 },
      { "name": "PULSAR 200 NS USD UG NEW", "price": 193437 },
      { "name": "PULSAR 250 N/F UG", "price": 184641 },
      { "name": "PULSAR 220 F UG NEW", "price": 170729 },
      { "name": "AVENGER 160 SEREET BS6", "price": 144872 },
      { "name": "AVENGER 220 STREET/CRUISE BS6", "price": 174113 },
      { "name": "PULSAR 200 RS BS6", "price": 205984 },
      { "name": "PULSAR NS 400 Z", "price": 227987 },
      { "name": "DOMINAR 250 BS6", "price": 219884 },
      { "name": "DOMINAR 400 BS6", "price": 279491 }
    ]   
  },
  {
    brand: "KTM",
    models: [
      { "name": "KTM DUKE 125", "price": 206591 },
      { "name": "KTM DUKE 200", "price": 232059 },
      { "name": "KTM NEW DUKE 250", "price": 279725 },
      { "name": "KTM NEW DUKE 390", "price": 366049 },
      { "name": "KTM RC 125", "price": 218909 },
      { "name": "KTM RC 200", "price": 255665 },
      { "name": "KTM RC 390", "price": 372349 },
      { "name": "KTM ADVENTURE 250", "price": 290991 },
      { "name": "KTM ADVENTURE 390 X", "price": 335023 },
      { "name": "KTM ADVENTURE 390", "price": 397062 },
      { "name": "KTM ADVENTURE 390 R - SW", "price": 423033 },
      { "name": "HUSQVARNA SVARTPILEN 401", "price": 343080 },
      { "name": "HUSQVARNA VITPILEN 250", "price": 255073 }
    ]
  },
];

const BRAND_LOGOS = {
  "HERO": "/herocompany.png",
  "Honda": "/hondalogomain.png",
  "TVS": "/tvslogo.png",
  "Suzuki": "/suzukilogo.png",
  "Yamaha": "/yamahalogo.png",
  "Royal Enfield": "/royalenfieldlogo.png",
  "Bajaj": "/bajajlogo.png",
  "KTM": "/ktmlogo.png"
};

interface FormData {
  name: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  paymentType: 'cash' | 'loan';
  downPayment: string;
  tenure: string;
  oldVehicleDetails: string;
  exchangeVehicle?: 'yes' | 'no';
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  brand: '',
  model: '',
  paymentType: 'cash',
  downPayment: '',
  tenure: '12',
  oldVehicleDetails: '',
  exchangeVehicle: 'no'
};

function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [models, setModels] = useState<{ name: string; price: number }[]>([]);
  const [selectedModelPrice, setSelectedModelPrice] = useState<number>(0);
  const [emi, setEmi] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formData.brand) {
      const brandData = VEHICLE_DATA.find(v => v.brand === formData.brand);
      setModels(brandData?.models || []);
      
      // Auto-refresh logic
      setTimeout(() => {
      }, 1000); // Adjust the timeout duration as needed
    }
  }, [formData.brand]);

  useEffect(() => {
    if (formData.model) {
      const modelData = models.find(m => m.name === formData.model);
      setSelectedModelPrice(modelData?.price || 0);
    }
  }, [formData.model, models]);

  useEffect(() => {
    if (formData.paymentType === 'loan' && formData.downPayment && selectedModelPrice) {
      const principal = selectedModelPrice - Number(formData.downPayment);
      const annualInterestRate = INTEREST_RATE;
      const tenureMonths = Number(formData.tenure);
      
      // Calculate total interest
      const totalInterest = (principal * annualInterestRate * (tenureMonths / 12)) / 100;
      
      // Calculate total amount to be repaid
      const totalAmountToBeRepaid = principal + totalInterest;
      
      // Calculate monthly EMI
      const monthlyEmi = totalAmountToBeRepaid / tenureMonths;
      
      setEmi(Math.round(monthlyEmi));
    }
  }, [formData.downPayment, formData.tenure, selectedModelPrice, formData.paymentType]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const processedFormData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        brand: formData.brand,
        model: formData.model,
        payment_type: formData.paymentType,
        down_payment: Number(formData.downPayment) || 0,
        tenure: Number(formData.tenure),
        old_vehicle_details: formData.oldVehicleDetails,
        exchange_vehicle: formData.exchangeVehicle
      };

      const response = await fetch(`https://sidhhivinayak-backend.vercel.app/api/quotation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify(processedFormData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to send quotation");
      }      
      // Reset form to initial state after successful submission
      setFormData(initialFormData);
      setSelectedModelPrice(0);
      setEmi(0);
      setModels([]);
      
    } catch (error) {
      console.error('Full error:', error);
      alert(error instanceof Error ? error.message : "Error sending quotation!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get Your Dream Bike Quote
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fill out the form below and we'll provide you with a detailed quote for your desired bike.
            Our team will contact you within 24 hours.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" 
                     style={{
                       backgroundImage: 'url("/pattern-bikes.png")',
                       backgroundSize: '60px 60px',
                       backgroundRepeat: 'repeat'
                     }}
                />
              </div>

              {/* Form Header */}
              <div className="relative flex items-center justify-center mb-8">
                <Calculator className="h-14 w-14 text-blue-600"/>
              </div>

              <form className="relative space-y-8" onSubmit={handleChange} method='post'>
                {/* Personal Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-blue-500 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="peer w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl
                                 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                                 transition-all duration-300 outline-none text-gray-700
                                 hover:border-blue-200 shadow-sm text-base font-medium"
                        required
                      />
                      <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none
                                     transition-opacity duration-300 peer-focus:opacity-0 peer-valid:opacity-0 text-base">
                        Enter your full name
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-blue-500 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="peer w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 roundedi cnat s-xl
                                 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                                 transition-all duration-300 outline-none text-gray-700
                                 hover:border-blue-200 shadow-sm text-base font-medium"
                        required
                        maxLength={10}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-blue-500 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="peer w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl
                                 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                                 transition-all duration-300 outline-none text-gray-700
                                 hover:border-blue-200 shadow-sm text-base font-medium"
                        required
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Vehicle Selection */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Brand
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        {formData.brand ? (
                          <img
                            src={BRAND_LOGOS[formData.brand as keyof typeof BRAND_LOGOS]}
                            alt={`${formData.brand} logo`}
                            className="h-5 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <Bike className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                        )}
                      </div>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl
                                 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                                 transition-all duration-300 outline-none text-gray-700
                                 hover:border-blue-200 shadow-sm appearance-none cursor-pointer
                                 text-base font-medium"
                        required
                      >
                        <option value="">Select Brand</option>
                        {VEHICLE_DATA.map(brand => (
                          <option key={brand.brand} value={brand.brand}>{brand.brand}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select Model
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Bike className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                      </div>
                      <select
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl
                                 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                                 transition-all duration-300 outline-none text-gray-700
                                 hover:border-blue-200 shadow-sm appearance-none cursor-pointer
                                 text-base font-medium"
                        required
                      >
                        <option value="">Select Model</option>
                        {models.map(model => (
                          <option key={model.name} value={model.name}>{model.name}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Type Radio Buttons */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Type
                  </label>
                  <div className="flex gap-6">
                    <label className="inline-flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="paymentType"
                        value="cash"
                        checked={formData.paymentType === 'cash'}
                        onChange={handleInputChange}
                        className="form-radio h-5 w-5 text-blue-600 border-2 border-gray-300
                                 focus:ring-blue-500 cursor-pointer transition-all duration-300"
                      />
                      <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">Cash</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="paymentType"
                        value="loan"
                        checked={formData.paymentType === 'loan'}
                        onChange={handleInputChange}
                        className="form-radio h-5 w-5 text-blue-600 border-2 border-gray-300
                                 focus:ring-blue-500 cursor-pointer transition-all duration-300"
                      />
                      <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">Loan</span>
                    </label>
                  </div>
                </div>

                {formData.paymentType === 'loan' && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Down Payment
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <CreditCard className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                        </div>
                        <input
                          type="number"
                          name="downPayment"
                          value={formData.downPayment}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl
                                   focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                   transition-all duration-300 outline-none text-gray-700
                                   hover:border-blue-300"
                          min="0"
                          max={selectedModelPrice}
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tenure (months)
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                        </div>
                        <select
                          name="tenure"
                          value={formData.tenure}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl
                                   focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                                   transition-all duration-300 outline-none text-gray-700
                                   hover:border-blue-300 appearance-none cursor-pointer"
                          required
                        >
                          {TENURE_OPTIONS.map(t => (
                            <option key={t} value={t}>{t} months</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Exchange Options */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Exchange Options</h2>
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Do you have a vehicle for exchange?
                    </label>
                    <div className="flex gap-6">
                      <label className="inline-flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="exchangeVehicle"
                          value="yes"
                          checked={formData.exchangeVehicle === 'yes'}
                          onChange={e => setFormData({...formData, exchangeVehicle: e.target.value as 'yes' | 'no'})}
                          className="form-radio h-5 w-5 text-blue-600 border-2 border-gray-300
                                   focus:ring-blue-500 cursor-pointer transition-all duration-300"
                        />
                        <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">Yes</span>
                      </label>
                      <label className="inline-flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="exchangeVehicle"
                          value="no"
                          checked={formData.exchangeVehicle === 'no'}
                          onChange={e => setFormData({...formData, exchangeVehicle: e.target.value as 'yes' | 'no'})}
                          className="form-radio h-5 w-5 text-blue-600 border-2 border-gray-300
                                   focus:ring-blue-500 cursor-pointer transition-all duration-300"
                        />
                        <span className="ml-2 text-gray-700 group-hover:text-blue-600 transition-colors">No</span>
                      </label>
                    </div>
                  </div>

                  {formData.exchangeVehicle === 'yes' && (
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Old Vehicle Details
                      </label>
                      <div className="relative group">
                        <textarea
                          name="oldVehicleDetails"
                          rows={3}
                          placeholder="Please provide details of your old vehicle (Brand, Model, Year, Condition)"
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-100 rounded-xl
                                   focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50
                                   transition-all duration-300 outline-none text-gray-700 placeholder-gray-400
                                   hover:border-blue-200 shadow-sm resize-none
                                   text-base font-medium"
                          value={formData.oldVehicleDetails}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quotation Summary with enhanced styling */}
                {selectedModelPrice > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Calculator className="w-6 h-6 text-indigo-600" />
                      <h2 className="text-xl font-semibold text-gray-900">Quotation Summary</h2>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-700">On-Road Price: ₹{selectedModelPrice.toLocaleString()}</p>
                      {formData.paymentType === 'loan' && formData.downPayment && (
                        <>
                          <p className="text-gray-700">Down Payment: ₹{Number(formData.downPayment).toLocaleString()}</p>
                          <p className="text-gray-700">
                            Loan Amount: ₹{(selectedModelPrice - Number(formData.downPayment)).toLocaleString()}
                          </p>
                          <p className="text-gray-700">Tenure: {formData.tenure} months</p>
                          <p className="text-xl font-bold text-indigo-600">Monthly EMI: ₹{emi.toLocaleString()}</p>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto group relative flex justify-center py-3 px-6 
                             bg-blue-600 text-white rounded-lg font-medium
                             hover:bg-blue-700 focus:outline-none focus:ring-2 
                             focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                        <span>Get Your Quote Now</span>
                      </div>
                    )}
                  </button>

                  <Link
                    to="/contact"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Need Help?</span>
                  </Link>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right Side - Assistance Section */}
          <div className="space-y-6">
            {/* Need Assistance Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Need Assistance?</h3>
              <p className="text-lg mb-6">Our team is here to help you make the right choice for your dream bike.</p>
              <div className="space-y-4">
                <Link
                  to="tel:+919998303810"
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm w-full px-4 py-3 rounded-xl
                           hover:bg-white/20 transition-all duration-300"
                >
                  <Phone className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-semibold">Call Us</p>
                    <p className="text-sm text-gray-200">+91 9998303810</p>
                  </div>
                </Link>

                <a
                  href="https://wa.me/+919998303810"
                  target="_blank"
                  className="flex items-center gap-3 bg-green-500 w-full px-4 py-3 rounded-xl
                           hover:bg-green-600 transition-all duration-300"
                >
                  <MessageCircle className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-sm text-gray-100">Chat with us</p>
                  </div>
                </a>
              </div>
            </motion.div>
            {/* Special Offer Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-xl p-8 text-white"
            >
              <h3 className="text-xl font-bold mb-2">Special Offer!</h3>
              <p className="mb-4">Get exclusive deals and special financing options on selected models.</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg
                         hover:bg-orange-50 transition-colors"
              >
                View Models
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


