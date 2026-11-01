import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Heart, Search, Menu, X, Globe, User, Shield, ChevronRight, 
  ChevronLeft, Check, Star, Filter, ArrowRight, Truck, Phone, MapPin, 
  CreditCard, Plus, Trash2, Edit, RefreshCw, BarChart3, Package, Users, 
  Tag, Settings, LogOut, CheckCircle2, Clock, AlertTriangle, Eye, Lock,
  Sparkles, Award, ArrowLeft, Download, ExternalLink, Printer
} from 'lucide-react';

// ==========================================
// 1. BRAND CONFIG & DICTIONARIES (i18n)
// ==========================================
const siteConfig = {
  nameBn: "সুঁই সুতার গল্প",
  nameEn: "Sui Sutar Golpo",
  taglineBn: "ঐতিহ্যের ছোঁয়ায়, প্রতিটি সুতায় গল্প",
  taglineEn: "Stories Woven in Every Thread",
  currency: { symbolBn: "৳", symbolEn: "BDT" },
  location: "Feni, Bangladesh",
  social: { facebook: "https://www.facebook.com/suisutargolpo2020/" },
  shipping: { insideFeni: 60, outsideFeni: 120 }
};

const dictionaries = {
  bn: {
    nav: { home: "হোম", shop: "শপ", sarees: "শাড়ি", threePiece: "থ্রি-পিস", panjabi: "পাঞ্জাবি", shawls: "শাল", handpainted: "হ্যান্ড পেইন্টেড", about: "আমাদের গল্প", track: "অর্ডার ট্র্যাকিং", admin: "এডমিন প্যানেল" },
    hero: { badge: "হাতে আঁকা বিশেষ কালেকশন ২০২৬", title: "ঐতিহ্যের ছোঁয়ায়, প্রতিটি সুতায় গল্প", subtitle: "ফেনীর সেরা কারিগরদের হাতে তৈরি ঐতিহ্যবাহী হ্যান্ড-পেইন্ট শাড়ি, থ্রি-পিস ও পাঞ্জাবির অপূর্ব সমাহার।", ctaShop: "কালেকশন দেখুন", ctaCraft: "আমাদের গল্প" },
    common: { addToCart: "কার্টে যোগ করুন", buyNow: "এখনই কিনুন", outOfStock: "স্টক শেষ", inStock: "স্টকে আছে", price: "মূল্য", bdt: "৳", view: "বিস্তারিত", filter: "ফিল্টার", search: "পণ্য খুঁজুন...", all: "সবগুলো", cart: "কার্ট", checkout: "চেকআউট", subtotal: "সাবটোটাল", shipping: "ডেলিভারি চার্জ", discount: "ছাড়", total: "সর্বমোট", apply: "প্রয়োগ", applyCoupon: "কুপন কোড", emptyCart: "আপনার কার্টটি খালি", wishlist: "উইশলিস্ট", searchPlaceholder: "পোশাকের নাম বা ধরণ দিয়ে খুঁজুন..." },
    checkout: { title: "অর্ডার চেকআউট", name: "আপনার নাম", phone: "মোবাইল নম্বর (১১ ডিজিট)", address: "সম্পূর্ণ ঠিকানা", division: "বিভাগ", district: "জেলা", upazila: "উপজেলা/থানা", notes: "বিশেষ নির্দেশাবলী (ঐচ্ছিক)", cod: "ক্যাশ অন ডেলিভারি (COD)", online: "অনলাইন পেমেন্ট (bKash/Nagad/SSLCOMMERZ)", confirm: "অর্ডার নিশ্চিত করুন", locationType: "ডেলিভারি এরিয়া", insideFeni: "ফেনীর ভেতরে (৳৬০)", outsideFeni: "ফেনীর বাইরে (৳১২০)" },
    admin: { dashboard: "ড্যাশবোর্ড", products: "পণ্য ব্যবস্থাপনা", orders: "অর্ডারসমূহ", coupons: "কুপন", settings: "স্টোর সেটিংস", addProduct: "নতুন পণ্য যোগ করুন", totalSales: "মোট বিক্রি", totalOrders: "মোট অর্ডার", pendingOrders: "অপেক্ষমাণ অর্ডার", lowStock: "কম স্টক" }
  },
  en: {
    nav: { home: "Home", shop: "Shop", sarees: "Sarees", threePiece: "Three-Piece", panjabi: "Panjabi", shawls: "Shawls", handpainted: "Hand-Painted", about: "Our Story", track: "Track Order", admin: "Admin Panel" },
    hero: { badge: "Hand-Painted Collection 2026", title: "Stories Woven in Every Thread", subtitle: "Exquisite Bangladeshi handcrafted sarees, three-pieces, and panjabis woven with authentic craftsmanship from Feni.", ctaShop: "Explore Collection", ctaCraft: "Our Heritage" },
    common: { addToCart: "Add to Cart", buyNow: "Buy Now", outOfStock: "Out of Stock", inStock: "In Stock", price: "Price", bdt: "BDT ৳", view: "View Details", filter: "Filter", search: "Search products...", all: "All", cart: "Cart", checkout: "Checkout", subtotal: "Subtotal", shipping: "Shipping Fee", discount: "Discount", total: "Grand Total", apply: "Apply", applyCoupon: "Coupon Code", emptyCart: "Your cart is empty", wishlist: "Wishlist", searchPlaceholder: "Search by product name or fabric..." },
    checkout: { title: "Order Checkout", name: "Full Name", phone: "Mobile Number (11 digits)", address: "Full Address", division: "Division", district: "District", upazila: "Upazila/Thana", notes: "Order Notes (Optional)", cod: "Cash on Delivery (COD)", online: "Online Payment (bKash/Nagad/Gateway)", confirm: "Confirm Order", locationType: "Delivery Region", insideFeni: "Inside Feni (BDT 60)", outsideFeni: "Outside Feni (BDT 120)" },
    admin: { dashboard: "Dashboard", products: "Products", orders: "Orders", coupons: "Coupons", settings: "Store Settings", addProduct: "Add New Product", totalSales: "Total Sales", totalOrders: "Total Orders", pendingOrders: "Pending Orders", lowStock: "Low Stock Alert" }
  }
};

// ==========================================
// 2. MOCK DATABASE (INITIAL PROMOTIONAL SEED DATA)
// ==========================================
const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    sku: "SSG-SAR-001",
    titleBn: "হ্যান্ড-পেইন্টেড প্রিমিয়াম জামদানী শাড়ি",
    titleEn: "Hand-Painted Premium Jamdani Saree",
    category: "sarees",
    price: 4850,
    salePrice: 4250,
    isHandPainted: true,
    isFeatured: true,
    isPublished: true,
    fabricBn: "হাফ-সিল্ক জামদানী ও ফেব্রিক কালার",
    fabricEn: "Half-Silk Jamdani with Fabric Colors",
    careBn: "ড্রাই ক্লিন বা মৃদু শ্যাম্পু ওয়াশ",
    careEn: "Dry Clean or Mild Shampoo Wash",
    descriptionBn: "ঐতিহ্যবাহী হাতে আঁকা পদ্ম ফুল ও লতাপাতার কারুকাজ সম্বলিত গর্জিয়াস জামদানী শাড়ি। উৎসবের জন্য সেরা পছন্দ।",
    descriptionEn: "Gorgeous Jamdani saree featuring traditional hand-painted lotus flowers and delicate floral vines. Perfect for festive occasions.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800"
    ],
    variants: [
      { id: "v1-1", colorBn: "রয়েল ব্লু & গোল্ড", colorEn: "Royal Blue & Gold", size: "12 Hands Standard", stock: 8, priceAdjustment: 0 },
      { id: "v1-2", colorBn: "মেরুন & এন্টিক গোল্ড", colorEn: "Maroon & Antique Gold", size: "12 Hands Standard", stock: 3, priceAdjustment: 200 }
    ]
  },
  {
    id: "prod-2",
    sku: "SSG-TP-002",
    titleBn: "হাতে বোনা কটন সুতি থ্রি-পিস",
    titleEn: "Handcrafted Cotton Three-Piece Set",
    category: "threePiece",
    price: 3200,
    salePrice: 2850,
    isHandPainted: true,
    isFeatured: true,
    isPublished: true,
    fabricBn: "১০০% প্রিমিয়াম সুতি কার্পাস ও সুতার কাজ",
    fabricEn: "100% Premium Cotton with Embroidery",
    careBn: "হ্যান্ড ওয়াশ করুন, ছায়ায় শুকান",
    careEn: "Hand Wash separately, dry in shade",
    descriptionBn: "নরম সুতি কাপড়ে আরামদায়ক নকশা ও সুতার কাজ। জামা, সালোয়ার এবং অর্গেনজা দোপাট্টা অন্তর্ভুক্ত।",
    descriptionEn: "Comfortable breathable pure cotton featuring soft threadwork embroidery. Includes kameez, salwar, and organza dupatta.",
    images: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=800"
    ],
    variants: [
      { id: "v2-1", colorBn: "বাসন্তী হলুদ", colorEn: "Marigold Yellow", size: "Unstitched", stock: 12, priceAdjustment: 0 },
      { id: "v2-2", colorBn: "পেস্ট গ্রিন", colorEn: "Pastel Green", size: "Stitched (L)", stock: 5, priceAdjustment: 300 }
    ]
  },
  {
    id: "prod-3",
    sku: "SSG-PAN-003",
    titleBn: "আভিজাত্যময় এমব্রয়ডারি কাটিং পাঞ্জাবি",
    titleEn: "Royal Embroidered Designer Panjabi",
    category: "panjabi",
    price: 2650,
    salePrice: null,
    isHandPainted: false,
    isFeatured: true,
    isPublished: true,
    fabricBn: "ফাইন কটন সিল্ক ব্লেন্ড",
    fabricEn: "Fine Cotton Silk Blend",
    careBn: "ড্রাই ওয়াশ করার পরামর্শ দেয়া হচ্ছে",
    careEn: "Dry Wash recommended",
    descriptionBn: "কলার ও প্লেটে সূক্ষ্ম এমব্রয়ডারির কাজ সহ মার্জিত কাটের প্রিমিয়াম পুরুষদের পাঞ্জাবি।",
    descriptionEn: "Sophisticated male Punjabi with minimalist collar and placket embroidery cut for timeless Bengali elegance.",
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800"
    ],
    variants: [
      { id: "v3-1", colorBn: "অফ-হোয়াইট", colorEn: "Off-White", size: "40", stock: 6, priceAdjustment: 0 },
      { id: "v3-2", colorBn: "অফ-হোয়াইট", colorEn: "Off-White", size: "42", stock: 9, priceAdjustment: 0 },
      { id: "v3-3", colorBn: "ডিফ বারগান্ডি", colorEn: "Deep Burgundy", size: "42", stock: 4, priceAdjustment: 100 }
    ]
  },
  {
    id: "prod-4",
    sku: "SSG-SHL-004",
    titleBn: "হাতে আঁকা পশমিনা শাল",
    titleEn: "Hand-Painted Luxury Pashmina Shawl",
    category: "shawls",
    price: 2150,
    salePrice: 1850,
    isHandPainted: true,
    isFeatured: false,
    isPublished: true,
    fabricBn: "নরম পশমিনা উল",
    fabricEn: "Soft Pure Pashmina Wool",
    careBn: "শুধুমাত্র ড্রাই ক্লিন",
    careEn: "Dry Clean Only",
    descriptionBn: "শীতের আভিজাত্যে হাতে আঁকা ফ্লোরাল মোটিফের উষ্ণ ও নরম পশমিনা শাল।",
    descriptionEn: "Warm, ultra-soft pashmina shawl adorned with signature floral motifs hand-painted by master artisans.",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800"
    ],
    variants: [
      { id: "v4-1", colorBn: "ক্রিম ও রেড", colorEn: "Cream & Red", size: "Free Size", stock: 15, priceAdjustment: 0 }
    ]
  }
];

const INITIAL_COUPONS = [
  { code: "SUTAR10", discountPercent: 10, minOrder: 1500, active: true },
  { code: "FENIFREE", discountFixed: 60, minOrder: 2000, active: true }
];

const INITIAL_ORDERS = [
  {
    id: "order-101",
    orderNumber: "SUTAR-20261031-8492",
    customerName: "নাসরিন সুলতানা",
    customerPhone: "01819000000",
    district: "Feni",
    upazila: "Feni Sadar",
    address: "মহাপাল রোড, রামপুর, ফেনী",
    items: [
      { productId: "prod-1", titleBn: "হ্যান্ড-পেইন্টেড প্রিমিয়াম জামদানী শাড়ি", variantInfo: "রয়েল ব্লু & গোল্ড", quantity: 1, unitPrice: 4250 }
    ],
    subtotal: 4250,
    deliveryFee: 60,
    discount: 0,
    grandTotal: 4310,
    paymentMethod: "COD",
    paymentStatus: "UNPAID",
    orderStatus: "PROCESSING",
    createdAt: "2026-10-31 14:20"
  }
];

// BANGLADESH GEOGRAPHIC SELECTION DATA
const DIVISIONS = [
  {
    nameBn: "চট্টগ্রাম", nameEn: "Chattogram",
    districts: [
      { nameBn: "ফেনী", nameEn: "Feni", upazilas: ["ফেনী সদর", "দাগনভূঞা", "ছাগলনাইয়া", "পরশুরাম", "ফুলগাজী", "সোনাগাজী"] },
      { nameBn: "চট্টগ্রাম", nameEn: "Chattogram", upazilas: ["পতেঙ্গা", "পাঁচলাইশ", "কোতোয়ালী", "হালিশহর"] },
      { nameBn: "কুমিল্লা", nameEn: "Comilla", upazilas: ["কুমিল্লা সদর", "চৌদ্দগ্রাম", "লাকসাম"] }
    ]
  },
  {
    nameBn: "ঢাকা", nameEn: "Dhaka",
    districts: [
      { nameBn: "ঢাকা", nameEn: "Dhaka", upazilas: ["ধানমন্ডি", "মিরপুর", "উত্তরা", "গুলশান", "সাবার"] },
      { nameBn: "গাজীপুর", nameEn: "Gazipur", upazilas: ["গাজীপুর সদর", "কালিয়াকৈর"] }
    ]
  }
];

// ==========================================
// MAIN REACT APPLICATION COMPONENT
// ==========================================
export default function App() {
  // Global State
  const [lang, setLang] = useState('bn');
  const [currentView, setCurrentView] = useState('home'); // home, shop, product, cart, checkout, order-success, track, admin, about
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  
  // Navigation & Shopping State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [lastOrderDetails, setLastOrderDetails] = useState(null);
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackInput, setTrackInput] = useState('');
  
  // Admin Authentication & Sub-View State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);

  // Localization helper shortcut
  const t = useMemo(() => dictionaries[lang], [lang]);

  // Persistent Local Cart Loader Simulation
  useEffect(() => {
    const savedCart = localStorage.getItem('sui_sutar_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch(e){}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sui_sutar_cart', JSON.stringify(cart));
  }, [cart]);

  // Utility to format BDT correctly
  const formatMoney = (amount) => {
    if (amount === undefined || amount === null) return lang === 'bn' ? '৳ ০' : 'BDT 0';
    const num = Number(amount);
    if (lang === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return `৳ ${num.toLocaleString('en-US').replace(/\d/g, d => bnDigits[d])}`;
    }
    return `BDT ${num.toLocaleString('en-US')}`;
  };

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = item.product.salePrice || item.product.price;
      const adjust = item.variant ? item.variant.priceAdjustment : 0;
      return sum + (price + adjust) * item.quantity;
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (cartSubtotal < (appliedCoupon.minOrder || 0)) return 0;
    if (appliedCoupon.discountPercent) {
      return Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    }
    if (appliedCoupon.discountFixed) {
      return appliedCoupon.discountFixed;
    }
    return 0;
  }, [appliedCoupon, cartSubtotal]);

  // Cart Actions
  const addToCart = (product, variant, qty = 1) => {
    const targetVariant = variant || product.variants[0];
    if (targetVariant.stock < 1) {
      alert(lang === 'bn' ? "দুঃখিত, এই প্রোডাক্টটি স্টকে নেই!" : "Sorry, this product variant is out of stock!");
      return;
    }

    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.variant.id === targetVariant.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + qty;
        if (newQty > targetVariant.stock) {
          alert(lang === 'bn' ? `সর্বোচ্চ স্টকে আছে ${targetVariant.stock} টি` : `Maximum available stock is ${targetVariant.stock}`);
          updated[existingIdx].quantity = targetVariant.stock;
        } else {
          updated[existingIdx].quantity = newQty;
        }
        return updated;
      }
      return [...prev, { product, variant: targetVariant, quantity: qty }];
    });
  };

  const updateCartQty = (prodId, variantId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === prodId && item.variant.id === variantId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          if (newQty > item.variant.stock) {
            alert(lang === 'bn' ? "স্টক সীমার বেশি যোগ করা যাবে না" : "Cannot exceed available stock");
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (prodId, variantId) => {
    setCart(prev => prev.filter(i => !(i.product.id === prodId && i.variant.id === variantId)));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      if (prev.some(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleApplyCoupon = () => {
    const found = coupons.find(c => c.code.toUpperCase() === couponCodeInput.trim().toUpperCase() && c.active);
    if (!found) {
      alert(lang === 'bn' ? "অবৈধ বা মেয়াদোত্তীর্ণ কুপন কোড!" : "Invalid or expired coupon code!");
      return;
    }
    if (cartSubtotal < (found.minOrder || 0)) {
      alert(lang === 'bn' ? `এই কুপনটি ব্যবহার করতে ন্যূনতম ${formatMoney(found.minOrder)} এর অর্ডার প্রয়োজন` : `Minimum order of ${formatMoney(found.minOrder)} required for this coupon.`);
      return;
    }
    setAppliedCoupon(found);
  };

  // Selected Product for PDP
  const selectedProduct = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || products[0];
  }, [products, selectedProductId]);

  // Filtered catalogue search
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (!p.isPublished) return false;
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory || (selectedCategory === 'handpainted' && p.isHandPainted);
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.titleBn.toLowerCase().includes(q) || p.titleEn.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#292321] font-sans flex flex-col antialiased selection:bg-[#652D3C] selection:text-white">
      
      {/* ==========================================
          TOP ANNOUNCEMENT BAR
      ========================================== */}
      <div className="bg-[#652D3C] text-[#FAF7F2] text-xs py-2 px-4 border-b border-[#C6A46C]/30 flex justify-between items-center font-medium">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-[#C6A46C] items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A46C]" />
            <span>
              {lang === 'bn' 
                ? "ফেনীসহ সারাদেশে ক্যাশ অন ডেলিভারি (COD) সুব্যবস্থা | হেল্পলাইন: 01700-000000" 
                : "Cash on Delivery Available Nationwide | Helpline: +880 1700-000000"}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('track')} 
              className="hover:text-[#C6A46C] transition-colors flex items-center gap-1"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>{t.nav.track}</span>
            </button>
            <div className="h-3 w-[1px] bg-[#C6A46C]/40"></div>
            <button 
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-xs transition"
            >
              <Globe className="w-3 h-3 text-[#C6A46C]" />
              <span className="font-semibold">{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================
          HEADER / NAVIGATION
      ========================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DED2]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo & Identity */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => { setCurrentView('home'); setSelectedCategory('all'); }} 
              className="text-left group"
            >
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#652D3C] tracking-tight group-hover:text-[#A55C4B] transition-colors">
                {siteConfig.nameBn}
              </h1>
              <p className="text-[10px] tracking-widest text-[#C6A46C] uppercase font-semibold -mt-1">
                {siteConfig.nameEn}
              </p>
            </button>

            {/* Desktop Navigation Category Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#292321]">
              <button 
                onClick={() => { setCurrentView('home'); setSelectedCategory('all'); }} 
                className={`hover:text-[#652D3C] transition-colors ${currentView === 'home' ? 'text-[#652D3C] font-bold border-b-2 border-[#652D3C] pb-1' : ''}`}
              >
                {t.nav.home}
              </button>
              <button 
                onClick={() => { setCurrentView('shop'); setSelectedCategory('sarees'); }} 
                className={`hover:text-[#652D3C] transition-colors ${selectedCategory === 'sarees' && currentView === 'shop' ? 'text-[#652D3C] font-bold border-b-2 border-[#652D3C] pb-1' : ''}`}
              >
                {t.nav.sarees}
              </button>
              <button 
                onClick={() => { setCurrentView('shop'); setSelectedCategory('threePiece'); }} 
                className={`hover:text-[#652D3C] transition-colors ${selectedCategory === 'threePiece' && currentView === 'shop' ? 'text-[#652D3C] font-bold border-b-2 border-[#652D3C] pb-1' : ''}`}
              >
                {t.nav.threePiece}
              </button>
              <button 
                onClick={() => { setCurrentView('shop'); setSelectedCategory('panjabi'); }} 
                className={`hover:text-[#652D3C] transition-colors ${selectedCategory === 'panjabi' && currentView === 'shop' ? 'text-[#652D3C] font-bold border-b-2 border-[#652D3C] pb-1' : ''}`}
              >
                {t.nav.panjabi}
              </button>
              <button 
                onClick={() => { setCurrentView('shop'); setSelectedCategory('handpainted'); }} 
                className={`hover:text-[#652D3C] transition-colors text-[#A55C4B] font-semibold ${selectedCategory === 'handpainted' && currentView === 'shop' ? 'border-b-2 border-[#A55C4B] pb-1' : ''}`}
              >
                ✨ {t.nav.handpainted}
              </button>
              <button 
                onClick={() => setCurrentView('about')} 
                className={`hover:text-[#652D3C] transition-colors ${currentView === 'about' ? 'text-[#652D3C] font-bold' : ''}`}
              >
                {t.nav.about}
              </button>
            </nav>
          </div>

          {/* Quick Actions (Search, Wishlist, Cart, Admin) */}
          <div className="flex items-center space-x-4">
            
            {/* Quick Search Trigger */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder={t.common.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'shop') setCurrentView('shop');
                }}
                className="w-48 xl:w-64 bg-[#E8DED2]/40 text-xs text-[#292321] pl-9 pr-3 py-2 rounded-full border border-[#E8DED2] focus:outline-none focus:border-[#C6A46C] focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-[#A55C4B] absolute left-3 top-2.5" />
            </div>

            {/* Wishlist Button */}
            <button 
              onClick={() => setCurrentView('shop')}
              className="relative p-2 text-[#292321] hover:text-[#652D3C] transition-colors"
              title={t.common.wishlist}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#A55C4B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button 
              onClick={() => setCurrentView('cart')}
              className="relative p-2 bg-[#652D3C] text-[#FAF7F2] rounded-full hover:bg-[#A55C4B] transition-colors shadow-sm flex items-center justify-center"
              title={t.common.cart}
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C6A46C] text-[#292321] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Admin Switcher Icon */}
            <button
              onClick={() => setCurrentView('admin')}
              className="p-2 text-[#292321]/70 hover:text-[#652D3C] transition"
              title={t.nav.admin}
            >
              <Shield className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN DYNAMIC VIEW ROUTER
      ========================================== */}
      <main className="flex-1">

        {/* --------------------------------------
            VIEW: HOMEPAGE (Phase 3)
        -------------------------------------- */}
        {currentView === 'home' && (
          <div>
            {/* HERO SECTION */}
            <section className="relative bg-[#FAF7F2] border-b border-[#E8DED2] overflow-hidden py-12 md:py-20">
              <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Hero Editorial Content */}
                <div className="lg:col-span-7 space-y-6 text-left z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#652D3C]/10 border border-[#652D3C]/20 rounded-full text-[#652D3C] text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#C6A46C]" />
                    <span>{t.hero.badge}</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#652D3C] leading-tight">
                    {t.hero.title}
                  </h1>

                  <p className="text-base md:text-lg text-[#292321]/80 max-w-xl leading-relaxed">
                    {t.hero.subtitle}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4 items-center">
                    <button 
                      onClick={() => { setCurrentView('shop'); setSelectedCategory('all'); }} 
                      className="px-8 py-3.5 bg-[#652D3C] text-white font-medium rounded-md hover:bg-[#A55C4B] transition shadow-md flex items-center gap-2 group"
                    >
                      <span>{t.hero.ctaShop}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => setCurrentView('about')} 
                      className="px-6 py-3.5 border border-[#652D3C] text-[#652D3C] font-medium rounded-md hover:bg-[#652D3C]/5 transition"
                    >
                      {t.hero.ctaCraft}
                    </button>
                  </div>

                  {/* Highlights Grid */}
                  <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#E8DED2] text-xs text-[#292321]/70">
                    <div>
                      <p className="font-bold text-sm text-[#652D3C]">১০০% নিখুঁত</p>
                      <p>কারিগরদের হাতে আঁকা নকশা</p>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#652D3C]">দ্রুত ডেলিভারি</p>
                      <p>ফেনী ও সারাদেশে হোম ডেলিভারি</p>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#652D3C]">ক্যাশ অন ডেলিভারি</p>
                      <p>পণ্য হাতে পেয়ে পেমেন্ট</p>
                    </div>
                  </div>
                </div>

                {/* Hero Editorial Photography Gallery */}
                <div className="lg:col-span-5 relative">
                  <div className="relative mx-auto max-w-md lg:max-w-none">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                      <img 
                        src={products[0]?.images[0]} 
                        alt="Bengali Fashion Saree" 
                        className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                      />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-[#E8DED2] hidden sm:flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center text-[#652D3C]">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#652D3C]">হ্যান্ডপেইন্টেড গ্যারান্টি</p>
                        <p className="text-[10px] text-[#A55C4B]">পাকা রং ও সেরা সুতি কাপড়</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* FEATURED CATEGORIES SECTION */}
            <section className="py-16 container mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C6A46C]">ক্যাটাগরি সমূহ</span>
                <h2 className="text-3xl font-serif font-bold text-[#652D3C] mt-2">আমাদের ঐতিহ্যবাহী পোশাক</h2>
                <div className="w-16 h-0.5 bg-[#C6A46C] mx-auto mt-3"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { id: 'sarees', nameBn: 'শাড়ি কালেকশন', nameEn: 'Saree Collection', img: products[0]?.images[0] },
                  { id: 'threePiece', nameBn: 'থ্রি-পিস কালেকশন', nameEn: 'Three-Piece Sets', img: products[1]?.images[0] },
                  { id: 'panjabi', nameBn: 'আভিজাত্যময় পাঞ্জাবি', nameEn: 'Royal Panjabi', img: products[2]?.images[0] },
                  { id: 'shawls', nameBn: 'হ্যান্ডমেড শাল', nameEn: 'Handmade Shawls', img: products[3]?.images[0] },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setCurrentView('shop'); }}
                    className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-md border border-[#E8DED2] text-left transition transform hover:-translate-y-1"
                  >
                    <img src={cat.img} alt={cat.nameBn} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                      <h3 className="text-lg font-serif font-bold group-hover:text-[#C6A46C] transition-colors">{lang === 'bn' ? cat.nameBn : cat.nameEn}</h3>
                      <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
                        <span>{lang === 'bn' ? 'ব্রাউজ করুন' : 'Explore'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* HAND-PAINTED SPOTLIGHT */}
            <section className="py-16 bg-[#652D3C] text-white">
              <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  <span className="text-xs font-bold tracking-widest text-[#C6A46C] uppercase">বিশেষ কারুকাজ</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold">হাতে আঁকা বিশেষ পোশাকের গল্প</h2>
                  <p className="text-white/80 text-sm leading-relaxed">
                    আমাদের প্রতিটি হ্যান্ড-পেইন্ট শাড়ি ও থ্রি-পিস তৈরি হয় নিখুঁত ভালোবাসায়। কারিগরের তুলির প্রতিটি টানে ফুটে ওঠে দেশীয় রূপকথা ও ফুল-লতাপাতার অনবদ্য চিত্রকর্ম।
                  </p>
                  <button 
                    onClick={() => { setSelectedCategory('handpainted'); setCurrentView('shop'); }}
                    className="mt-4 px-6 py-3 bg-[#C6A46C] text-[#292321] font-bold text-sm rounded hover:bg-white transition flex items-center gap-2"
                  >
                    <span>হ্যান্ডপেইন্টেড শপ দেখুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg overflow-hidden border-2 border-[#C6A46C]/40">
                    <img src={products[0]?.images[0]} alt="Artisan detail" className="w-full h-48 object-cover" />
                  </div>
                  <div className="rounded-lg overflow-hidden border-2 border-[#C6A46C]/40 mt-6">
                    <img src={products[1]?.images[0]} alt="Handpainted fabric" className="w-full h-48 object-cover" />
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED CATALOGUE SHOWCASE */}
            <section className="py-16 container mx-auto px-4">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#652D3C]">নতুন কালেকশন</h2>
                  <p className="text-xs text-[#292321]/70 mt-1">সরাসরি কারিগরদের থেকে সংগৃহীত লেটেস্ট ডিজাইন</p>
                </div>
                <button 
                  onClick={() => { setCurrentView('shop'); setSelectedCategory('all'); }} 
                  className="text-sm font-bold text-[#652D3C] hover:text-[#A55C4B] flex items-center gap-1"
                >
                  <span>সব পণ্য</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.slice(0, 4).map(prod => (
                  <ProductCard 
                    key={prod.id} 
                    product={prod} 
                    lang={lang} 
                    formatMoney={formatMoney}
                    onSelect={() => { setSelectedProductId(prod.id); setCurrentView('product'); }}
                    onAddToCart={() => addToCart(prod, prod.variants[0])}
                    onWishlist={() => toggleWishlist(prod)}
                    isWishlisted={wishlist.some(w => w.id === prod.id)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* --------------------------------------
            VIEW: SHOP / CATALOGUE (Phase 4)
        -------------------------------------- */}
        {currentView === 'shop' && (
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-[#E8DED2] pb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#652D3C]">
                  {selectedCategory === 'all' ? t.nav.shop : t.nav[selectedCategory] || selectedCategory}
                </h1>
                <p className="text-xs text-[#292321]/70 mt-1">
                  {filteredProducts.length} টি পণ্য পাওয়া গিয়েছে
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 text-xs">
                {['all', 'sarees', 'threePiece', 'panjabi', 'shawls', 'handpainted'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full border transition ${
                      selectedCategory === cat 
                        ? 'bg-[#652D3C] text-white border-[#652D3C] font-semibold' 
                        : 'bg-white text-[#292321] border-[#E8DED2] hover:border-[#652D3C]'
                    }`}
                  >
                    {cat === 'all' ? t.common.all : t.nav[cat] || cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Catalogue Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-[#292321]/60">
                <Package className="w-12 h-12 mx-auto text-[#A55C4B] mb-3 opacity-50" />
                <p className="text-lg font-serif">কোন পণ্য পাওয়া যায়নি</p>
                <p className="text-xs mt-1">অনুগ্রহ করে অন্য কোনো ফিল্টার নির্বাচন করুন</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts.map(prod => (
                  <ProductCard 
                    key={prod.id} 
                    product={prod} 
                    lang={lang} 
                    formatMoney={formatMoney}
                    onSelect={() => { setSelectedProductId(prod.id); setCurrentView('product'); }}
                    onAddToCart={() => addToCart(prod, prod.variants[0])}
                    onWishlist={() => toggleWishlist(prod)}
                    isWishlisted={wishlist.some(w => w.id === prod.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* --------------------------------------
            VIEW: PRODUCT DETAIL PAGE (PDP) (Phase 4)
        -------------------------------------- */}
        {currentView === 'product' && selectedProduct && (
          <div className="container mx-auto px-4 py-8">
            <button 
              onClick={() => setCurrentView('shop')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#652D3C] hover:text-[#A55C4B] mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>শপে ফিরে যান</span>
            </button>

            <ProductDetailSection 
              product={selectedProduct}
              lang={lang}
              formatMoney={formatMoney}
              onAddToCart={addToCart}
              onWishlist={toggleWishlist}
              isWishlisted={wishlist.some(w => w.id === selectedProduct.id)}
            />
          </div>
        )}

        {/* --------------------------------------
            VIEW: SHOPPING CART (Phase 4)
        -------------------------------------- */}
        {currentView === 'cart' && (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-2xl font-serif font-bold text-[#652D3C] mb-6 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              <span>{t.common.cart} ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
            </h1>

            {cart.length === 0 ? (
              <div className="bg-white p-12 rounded-xl text-center border border-[#E8DED2]">
                <ShoppingBag className="w-16 h-16 text-[#E8DED2] mx-auto mb-4" />
                <h2 className="text-xl font-serif font-bold text-[#292321]">{t.common.emptyCart}</h2>
                <p className="text-xs text-[#292321]/60 mt-1 mb-6">আপনার পছন্দের পোশাকটি নির্বাচন করতে শপ ব্রাউজ করুন</p>
                <button 
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-2.5 bg-[#652D3C] text-white rounded text-sm font-semibold hover:bg-[#A55C4B] transition"
                >
                  শপিং শুরু করুন
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Cart Line Items */}
                <div className="lg:col-span-8 space-y-4">
                  {cart.map((item, idx) => {
                    const price = item.product.salePrice || item.product.price;
                    const finalUnitPrice = price + (item.variant.priceAdjustment || 0);
                    return (
                      <div key={`${item.product.id}-${item.variant.id}`} className="bg-white p-4 rounded-xl border border-[#E8DED2] flex gap-4 items-center">
                        <img src={item.product.images[0]} alt={item.product.titleBn} className="w-20 h-24 object-cover rounded-md" />
                        
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-[#292321]">{lang === 'bn' ? item.product.titleBn : item.product.titleEn}</h3>
                          <p className="text-xs text-[#A55C4B] mt-0.5">
                            কালার: {lang === 'bn' ? item.variant.colorBn : item.variant.colorEn} | সাইজ: {item.variant.size}
                          </p>
                          <p className="text-sm font-bold text-[#652D3C] mt-2">{formatMoney(finalUnitPrice)}</p>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#E8DED2] rounded text-xs">
                          <button 
                            onClick={() => updateCartQty(item.product.id, item.variant.id, -1)}
                            className="px-2 py-1 text-[#292321] hover:bg-[#FAF7F2]"
                          >
                            -
                          </button>
                          <span className="px-3 font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQty(item.product.id, item.variant.id, 1)}
                            className="px-2 py-1 text-[#292321] hover:bg-[#FAF7F2]"
                          >
                            +
                          </button>
                        </div>

                        <button 
                          onClick={() => removeFromCart(item.product.id, item.variant.id)}
                          className="p-2 text-red-500 hover:text-red-700 text-xs"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Cart Summary & Coupon Section */}
                <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-[#E8DED2] h-fit space-y-6">
                  <h2 className="text-lg font-serif font-bold text-[#652D3C] border-b pb-3">অর্ডার সারসংক্ষেপ</h2>

                  {/* Coupon Form */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#292321]">{t.common.applyCoupon}</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value)}
                        placeholder="কুপন কোড (যেমন SUTAR10)"
                        className="flex-1 bg-[#FAF7F2] border border-[#E8DED2] px-3 py-1.5 rounded text-xs focus:outline-none uppercase"
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        className="bg-[#652D3C] text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-[#A55C4B]"
                      >
                        {t.common.apply}
                      </button>
                    </div>
                    {appliedCoupon && (
                      <p className="text-[11px] text-green-700 font-semibold flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>কুপন প্রয়োগ করা হয়েছে ({appliedCoupon.code})</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-xs border-t border-b py-3">
                    <div className="flex justify-between">
                      <span className="text-[#292321]/70">{t.common.subtotal}</span>
                      <span className="font-semibold">{formatMoney(cartSubtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-700 font-semibold">
                        <span>{t.common.discount}</span>
                        <span>- {formatMoney(discountAmount)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#652D3C]">
                    <span>{t.common.total}</span>
                    <span>{formatMoney(cartSubtotal - discountAmount)}</span>
                  </div>

                  <button 
                    onClick={() => setCurrentView('checkout')}
                    className="w-full py-3 bg-[#652D3C] text-white font-bold text-sm rounded shadow hover:bg-[#A55C4B] transition flex items-center justify-center gap-2"
                  >
                    <span>{t.common.checkout}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --------------------------------------
            VIEW: CHECKOUT (Phase 5)
        -------------------------------------- */}
        {currentView === 'checkout' && (
          <CheckoutSection 
            cart={cart}
            cartSubtotal={cartSubtotal}
            discountAmount={discountAmount}
            lang={lang}
            t={t}
            formatMoney={formatMoney}
            onOrderPlaced={(newOrder) => {
              setOrders(prev => [newOrder, ...prev]);
              setLastOrderDetails(newOrder);
              setCart([]);
              setAppliedCoupon(null);
              setCurrentView('order-success');
            }}
          />
        )}

        {/* --------------------------------------
            VIEW: ORDER SUCCESS CONFIRMATION (Phase 5)
        -------------------------------------- */}
        {currentView === 'order-success' && lastOrderDetails && (
          <div className="container mx-auto px-4 py-12 max-w-xl text-center">
            <div className="bg-white p-8 rounded-2xl border border-[#E8DED2] shadow-lg space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#652D3C]">অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!</h1>
              <p className="text-xs text-[#292321]/70">
                ধন্যবাদ, {lastOrderDetails.customerName}। আপনার অর্ডারটি গ্রহণ করা হয়েছে এবং প্রতিনিধি শীঘ্রই ফোন করে নিশ্চিত করবেন।
              </p>
              
              <div className="bg-[#FAF7F2] p-4 rounded-lg text-left text-xs space-y-1 font-mono border">
                <p><span className="font-bold text-[#652D3C]">অর্ডার নম্বর:</span> {lastOrderDetails.orderNumber}</p>
                <p><span className="font-bold text-[#652D3C]">পেমেন্ট পদ্ধতি:</span> {lastOrderDetails.paymentMethod}</p>
                <p><span className="font-bold text-[#652D3C]">সর্বমোট প্রদেয়:</span> {formatMoney(lastOrderDetails.grandTotal)}</p>
                <p><span className="font-bold text-[#652D3C]">ডেলিভারি ঠিকানা:</span> {lastOrderDetails.address}, {lastOrderDetails.upazila}, {lastOrderDetails.district}</p>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => window.print()} 
                  className="flex-1 py-2.5 border border-[#652D3C] text-[#652D3C] text-xs font-bold rounded flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>রসিদ প্রিন্ট করুন</span>
                </button>
                <button 
                  onClick={() => setCurrentView('home')} 
                  className="flex-1 py-2.5 bg-[#652D3C] text-white text-xs font-bold rounded"
                >
                  হোমে ফিরে যান
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------
            VIEW: ORDER TRACKING (Phase 5)
        -------------------------------------- */}
        {currentView === 'track' && (
          <div className="container mx-auto px-4 py-12 max-w-xl">
            <div className="bg-white p-8 rounded-xl border border-[#E8DED2] shadow-sm space-y-6">
              <h1 className="text-2xl font-serif font-bold text-[#652D3C] text-center">অর্ডার স্ট্যাটাস ট্র্যাকিং</h1>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  placeholder="অর্ডার নম্বর দিন (যেমন SUTAR-20261031-8492)"
                  className="flex-1 border px-3 py-2 text-xs rounded focus:outline-none uppercase font-mono"
                />
                <button 
                  onClick={() => {
                    const match = orders.find(o => o.orderNumber.toUpperCase() === trackInput.trim().toUpperCase());
                    setTrackedOrder(match || 'NOT_FOUND');
                  }}
                  className="bg-[#652D3C] text-white text-xs px-4 py-2 rounded font-bold"
                >
                  খুঁজুন
                </button>
              </div>

              {trackedOrder === 'NOT_FOUND' && (
                <p className="text-xs text-red-600 text-center font-semibold">এই নম্বর দিয়ে কোনো অর্ডার পাওয়া যায়নি। নম্বরটি পুনরায় চেক করুন।</p>
              )}

              {trackedOrder && trackedOrder !== 'NOT_FOUND' && (
                <div className="border-t pt-4 space-y-4 text-xs">
                  <div className="flex justify-between items-center bg-[#FAF7F2] p-3 rounded">
                    <div>
                      <p className="font-bold text-[#652D3C]">{trackedOrder.orderNumber}</p>
                      <p className="text-[10px] text-[#292321]/60">তারিখ: {trackedOrder.createdAt}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-[#C6A46C] text-[#292321] rounded-full font-bold text-[10px]">
                      {trackedOrder.orderStatus}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-[#652D3C]">অর্ডারকৃত আইটেম:</p>
                    {trackedOrder.items.map((i, idx) => (
                      <div key={idx} className="flex justify-between text-[#292321]/80">
                        <span>{i.titleBn} ({i.quantity} টি)</span>
                        <span>{formatMoney(i.unitPrice * i.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --------------------------------------
            VIEW: ABOUT US BRAND HERITAGE
        -------------------------------------- */}
        {currentView === 'about' && (
          <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-serif font-bold text-[#652D3C]">সুঁই সুতার গল্পের পথচলা</h1>
              <p className="text-xs text-[#C6A46C] font-semibold uppercase tracking-widest">Feni, Bangladesh</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-[#E8DED2] space-y-4 text-sm text-[#292321]/80 leading-relaxed">
              <p>
                সুঁই সুতার গল্প ২০২০ সাল থেকে বাংলাদেশের ঐতিহ্যবাহী হস্তশিল্প ও কাপড়ের নিজস্ব শিল্পশৈলী ছড়িয়ে দিতে প্রতিশ্রুতিবদ্ধ। আমাদের অবস্থান ফেনীতে হলেও পুরো বাংলাদেশে পৌঁছে যাচ্ছে আমাদের হস্তশিল্প।
              </p>
              <p>
                আমাদের প্রতিটি পোশাকে সুতা ও তুলির আচড়ে ফুটে ওঠে বাঙালিয়ানার খাঁটি ছোঁয়া। জামদানী শাড়ি, হস্তশিল্প নির্ভর থ্রি-পিস ও আভিজাত্যময় পাঞ্জাবি তৈরিতে স্থানীয় কারিগরদের ভালোবাসা জড়িত।
              </p>
            </div>
          </div>
        )}

        {/* --------------------------------------
            VIEW: ADMIN DASHBOARD (Phase 6)
        -------------------------------------- */}
        {currentView === 'admin' && (
          <div className="container mx-auto px-4 py-8">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-xl border border-[#E8DED2] shadow-md space-y-4">
                <div className="text-center">
                  <Lock className="w-10 h-10 text-[#652D3C] mx-auto mb-2" />
                  <h1 className="text-xl font-serif font-bold text-[#652D3C]">এডমিন প্যানেলে লগইন করুন</h1>
                  <p className="text-xs text-[#292321]/60">সুঁই সুতার গল্প সিকিউর ব্যাকএন্ড প্যানেল</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">পাসওয়ার্ড (ডেমো পাসওয়ার্ড: admin)</label>
                  <input 
                    type="password" 
                    value={adminPassInput}
                    onChange={(e) => setAdminPassInput(e.target.value)}
                    className="w-full border px-3 py-2 text-xs rounded focus:outline-none"
                    placeholder="পাসওয়ার্ড দিন..."
                  />
                </div>
                <button 
                  onClick={() => {
                    if (adminPassInput === 'admin') {
                      setIsAdminLoggedIn(true);
                    } else {
                      alert("ভুল পাসওয়ার্ড!");
                    }
                  }}
                  className="w-full py-2.5 bg-[#652D3C] text-white font-bold text-xs rounded"
                >
                  লগইন
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Admin Top Navigation Header */}
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-[#E8DED2]">
                  <div>
                    <h1 className="text-xl font-serif font-bold text-[#652D3C]">এডমিন কন্ট্রোল সেন্টার</h1>
                    <p className="text-[11px] text-[#292321]/60">সুঁই সুতার গল্প ই-কমার্স ডাটাবেজ</p>
                  </div>
                  <button 
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="flex items-center gap-1 text-xs text-red-600 font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>লগআউট</span>
                  </button>
                </div>

                {/* Admin Tabs */}
                <div className="flex gap-2 border-b border-[#E8DED2] pb-2 text-xs font-semibold">
                  {['dashboard', 'products', 'orders', 'coupons'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setAdminTab(tab)}
                      className={`px-4 py-2 rounded-t transition ${
                        adminTab === tab ? 'bg-[#652D3C] text-white' : 'bg-white text-[#292321] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {t.admin[tab] || tab}
                    </button>
                  ))}
                </div>

                {/* ADMIN TAB: DASHBOARD */}
                {adminTab === 'dashboard' && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-[#E8DED2] space-y-1">
                      <p className="text-xs text-[#292321]/60">{t.admin.totalSales}</p>
                      <p className="text-2xl font-bold text-[#652D3C]">
                        {formatMoney(orders.reduce((s, o) => s + o.grandTotal, 0))}
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-[#E8DED2] space-y-1">
                      <p className="text-xs text-[#292321]/60">{t.admin.totalOrders}</p>
                      <p className="text-2xl font-bold text-[#292321]">{orders.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-[#E8DED2] space-y-1">
                      <p className="text-xs text-[#292321]/60">{t.admin.pendingOrders}</p>
                      <p className="text-2xl font-bold text-amber-600">
                        {orders.filter(o => o.orderStatus === 'PROCESSING' || o.orderStatus === 'PENDING').length}
                      </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-[#E8DED2] space-y-1">
                      <p className="text-xs text-[#292321]/60">{t.admin.lowStock}</p>
                      <p className="text-2xl font-bold text-red-600">
                        {products.filter(p => p.variants.some(v => v.stock < 5)).length}
                      </p>
                    </div>
                  </div>
                )}

                {/* ADMIN TAB: PRODUCTS */}
                {adminTab === 'products' && (
                  <div className="bg-white p-6 rounded-xl border border-[#E8DED2] space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold text-[#652D3C]">পণ্য তালিকা</h2>
                      <button 
                        onClick={() => {
                          const newProd = {
                            id: `prod-${Date.now()}`,
                            sku: `SSG-NEW-${Math.floor(Math.random()*1000)}`,
                            titleBn: "নতুন শাড়ি প্রোডাক্ট",
                            titleEn: "New Artisanal Saree",
                            category: "sarees",
                            price: 3500,
                            salePrice: null,
                            isHandPainted: true,
                            isFeatured: false,
                            isPublished: true,
                            images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800"],
                            variants: [{ id: `v-${Date.now()}`, colorBn: "লাল", colorEn: "Red", size: "Free Size", stock: 10, priceAdjustment: 0 }]
                          };
                          setProducts(prev => [newProd, ...prev]);
                          alert("নতুন স্যাম্পল প্রোডাক্ট ডাটাবেজে যোগ করা হয়েছে!");
                        }}
                        className="px-3 py-1.5 bg-[#652D3C] text-white text-xs font-bold rounded flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>পণ্য যোগ করুন</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b bg-[#FAF7F2] text-[#652D3C]">
                            <th className="p-3">ইমেজ</th>
                            <th className="p-3">SKU</th>
                            <th className="p-3">নাম</th>
                            <th className="p-3">মূল্য</th>
                            <th className="p-3">মোট স্টক</th>
                            <th className="p-3">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {products.map(p => {
                            const totalStock = p.variants.reduce((s, v) => s + v.stock, 0);
                            return (
                              <tr key={p.id} className="hover:bg-gray-50">
                                <td className="p-3">
                                  <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded" />
                                </td>
                                <td className="p-3 font-mono font-bold text-[#A55C4B]">{p.sku}</td>
                                <td className="p-3 font-semibold">{p.titleBn}</td>
                                <td className="p-3 font-bold">{formatMoney(p.salePrice || p.price)}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-0.5 rounded font-bold ${totalStock < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {totalStock} টি
                                  </span>
                                </td>
                                <td className="p-3 flex gap-2">
                                  <button 
                                    onClick={() => {
                                      const newPrice = prompt("নতুন মূল্য দিন (BDT):", p.price);
                                      if (newPrice) {
                                        setProducts(prev => prev.map(item => item.id === p.id ? { ...item, price: Number(newPrice) } : item));
                                      }
                                    }}
                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                    title="প্রাইস আপডেট করুন"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => {
                                      if (confirm("পণ্যটি মুছে ফেলতে চান?")) {
                                        setProducts(prev => prev.filter(item => item.id !== p.id));
                                      }
                                    }}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                    title="মুছুন"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ADMIN TAB: ORDERS */}
                {adminTab === 'orders' && (
                  <div className="bg-white p-6 rounded-xl border border-[#E8DED2] space-y-4">
                    <h2 className="text-lg font-bold text-[#652D3C]">অর্ডার ডেলিভারি ম্যানেজমেন্ট</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b bg-[#FAF7F2] text-[#652D3C]">
                            <th className="p-3">অর্ডার নং</th>
                            <th className="p-3">গ্রাহকের নাম ও ফোন</th>
                            <th className="p-3">ঠিকানা</th>
                            <th className="p-3">সর্বমোট</th>
                            <th className="p-3">পেমেন্ট</th>
                            <th className="p-3">স্ট্যাটাস</th>
                            <th className="p-3">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {orders.map(o => (
                            <tr key={o.id} className="hover:bg-gray-50">
                              <td className="p-3 font-mono font-bold text-[#652D3C]">{o.orderNumber}</td>
                              <td className="p-3">
                                <p className="font-bold">{o.customerName}</p>
                                <p className="text-[10px] text-[#292321]/60">{o.customerPhone}</p>
                              </td>
                              <td className="p-3 text-[11px] max-w-xs">{o.address}, {o.district}</td>
                              <td className="p-3 font-bold">{formatMoney(o.grandTotal)}</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${o.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                  {o.paymentMethod} ({o.paymentStatus})
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                                  {o.orderStatus}
                                </span>
                              </td>
                              <td className="p-3">
                                <select 
                                  value={o.orderStatus}
                                  onChange={(e) => {
                                    const nextStatus = e.target.value;
                                    setOrders(prev => prev.map(item => item.id === o.id ? { ...item, orderStatus: nextStatus } : item));
                                  }}
                                  className="border rounded px-2 py-1 text-[11px] bg-white"
                                >
                                  <option value="PROCESSING">PROCESSING</option>
                                  <option value="SHIPPED">SHIPPED</option>
                                  <option value="DELIVERED">DELIVERED</option>
                                  <option value="CANCELLED">CANCELLED</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ADMIN TAB: COUPONS */}
                {adminTab === 'coupons' && (
                  <div className="bg-white p-6 rounded-xl border border-[#E8DED2] space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold text-[#652D3C]">ডিসকাউন্ট কুপনসমূহ</h2>
                      <button 
                        onClick={() => {
                          const code = prompt("কুপন কোড (যেমন EID20):");
                          if (code) {
                            setCoupons(prev => [...prev, { code: code.toUpperCase(), discountPercent: 15, minOrder: 1000, active: true }]);
                          }
                        }}
                        className="px-3 py-1.5 bg-[#652D3C] text-white text-xs font-bold rounded flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>কুপন যোগ করুন</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {coupons.map((c, i) => (
                        <div key={i} className="border p-4 rounded-lg bg-[#FAF7F2] flex justify-between items-center">
                          <div>
                            <p className="font-mono font-bold text-sm text-[#652D3C]">{c.code}</p>
                            <p className="text-xs text-[#292321]/70">
                              {c.discountPercent ? `${c.discountPercent}% ছাড়` : `৳${c.discountFixed} ছাড়`} (সর্বনিম্ন অর্ডার: ৳{c.minOrder})
                            </p>
                          </div>
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded">অ্যাক্টিভ</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

      </main>

      {/* ==========================================
          FOOTER (Phase 3)
      ========================================== */}
      <footer className="bg-[#292321] text-[#FAF7F2] border-t-4 border-[#C6A46C] mt-16">
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C6A46C]">{siteConfig.nameBn}</h2>
            <p className="text-[#FAF7F2]/70 leading-relaxed">
              {siteConfig.descriptionBn}
            </p>
            <p className="text-[11px] text-[#C6A46C]">{t.footer.heritage}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-sm text-[#C6A46C] uppercase tracking-wider">পোশাক ক্যাটাগরি</h3>
            <ul className="space-y-1.5 text-[#FAF7F2]/80">
              <li><button onClick={() => { setSelectedCategory('sarees'); setCurrentView('shop'); }} className="hover:text-[#C6A46C]">{t.nav.sarees}</button></li>
              <li><button onClick={() => { setSelectedCategory('threePiece'); setCurrentView('shop'); }} className="hover:text-[#C6A46C]">{t.nav.threePiece}</button></li>
              <li><button onClick={() => { setSelectedCategory('panjabi'); setCurrentView('shop'); }} className="hover:text-[#C6A46C]">{t.nav.panjabi}</button></li>
              <li><button onClick={() => { setSelectedCategory('handpainted'); setCurrentView('shop'); }} className="hover:text-[#C6A46C]">{t.nav.handpainted}</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif font-bold text-sm text-[#C6A46C] uppercase tracking-wider">গ্রাহক সেবা</h3>
            <ul className="space-y-1.5 text-[#FAF7F2]/80">
              <li><button onClick={() => setCurrentView('track')} className="hover:text-[#C6A46C]">{t.nav.track}</button></li>
              <li><button onClick={() => setCurrentView('about')} className="hover:text-[#C6A46C]">{t.nav.about}</button></li>
              <li><a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="hover:text-[#C6A46C] flex items-center gap-1">
                <span>অফিসিয়াল ফেইসবুক পেজ</span>
                <ExternalLink className="w-3 h-3 text-[#C6A46C]" />
              </a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm text-[#C6A46C] uppercase tracking-wider">যোগাযোগের তথ্য</h3>
            <p className="text-[#FAF7F2]/80 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C6A46C]" />
              <span>ফেনী সদর, ফেনী, চট্টগ্রাম, বাংলাদেশ</span>
            </p>
            <p className="text-[#FAF7F2]/80 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C6A46C]" />
              <span>+৮৮০ ১৭০০-০০০০০০</span>
            </p>
          </div>

        </div>

        <div className="bg-black/40 py-4 text-center text-[11px] text-[#FAF7F2]/50 border-t border-white/10">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>{t.footer.rights}</p>
            <p className="text-[#C6A46C]">Designed for Authentic Bengali Fashion Craftsmanship</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ==========================================
// REUSABLE UI COMPONENT: PRODUCT CARD
// ==========================================
function ProductCard({ product, lang, formatMoney, onSelect, onAddToCart, onWishlist, isWishlisted }) {
  const finalPrice = product.salePrice || product.price;

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-[#E8DED2] hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF7F2] cursor-pointer" onClick={onSelect}>
        <img 
          src={product.images[0]} 
          alt={product.titleBn} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isHandPainted && (
            <span className="bg-[#652D3C] text-[#FAF7F2] text-[10px] font-bold px-2 py-0.5 rounded shadow">
              হ্যান্ড পেইন্টেড
            </span>
          )}
          {product.salePrice && (
            <span className="bg-[#A55C4B] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
              ছাড়!
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onWishlist(); }}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-[#292321] hover:bg-white'}`}
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={onSelect}
            className="text-xs md:text-sm font-bold text-[#292321] group-hover:text-[#652D3C] transition cursor-pointer line-clamp-2"
          >
            {lang === 'bn' ? product.titleBn : product.titleEn}
          </h3>
          <p className="text-[10px] text-[#A55C4B] font-semibold mt-1">
            {product.fabricBn}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-[#E8DED2]/60 flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-[#652D3C]">
              {formatMoney(finalPrice)}
            </span>
            {product.salePrice && (
              <span className="text-[10px] text-gray-400 line-through ml-1.5">
                {formatMoney(product.price)}
              </span>
            )}
          </div>

          <button 
            onClick={onAddToCart}
            className="p-2 bg-[#FAF7F2] text-[#652D3C] hover:bg-[#652D3C] hover:text-white rounded-full border border-[#652D3C]/20 transition shadow-sm"
            title="কার্টে যোগ করুন"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// REUSABLE UI COMPONENT: PRODUCT DETAIL VIEW
// ==========================================
function ProductDetailSection({ product, lang, formatMoney, onAddToCart, onWishlist, isWishlisted }) {
  const [activeImg, setActiveImg] = useState(product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [qty, setQty] = useState(1);

  const currentPrice = (product.salePrice || product.price) + (selectedVariant.priceAdjustment || 0);

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl border border-[#E8DED2] grid grid-cols-1 md:grid-cols-12 gap-8 shadow-sm">
      
      {/* Product Image Gallery */}
      <div className="md:col-span-6 space-y-4">
        <div className="aspect-[3/4] rounded-xl overflow-hidden border border-[#E8DED2]">
          <img src={activeImg} alt="" className="w-full h-full object-cover" />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`w-16 h-20 rounded-md overflow-hidden border-2 transition ${activeImg === img ? 'border-[#652D3C]' : 'border-transparent opacity-60'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Details & Purchase Form */}
      <div className="md:col-span-6 space-y-6">
        <div>
          <span className="text-xs font-bold text-[#A55C4B] tracking-wider uppercase">SKU: {product.sku}</span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#652D3C] mt-1">
            {lang === 'bn' ? product.titleBn : product.titleEn}
          </h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-[#652D3C]">{formatMoney(currentPrice)}</span>
            {product.salePrice && (
              <span className="text-sm text-gray-400 line-through">{formatMoney(product.price)}</span>
            )}
          </div>
        </div>

        {/* Variant Selection */}
        <div className="space-y-4 border-t border-b py-4">
          <div>
            <label className="text-xs font-bold text-[#292321] block mb-2">রং / ভ্যারিয়েন্ট নির্বাচন করুন:</label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map(v => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold border transition ${
                    selectedVariant.id === v.id 
                      ? 'bg-[#652D3C] text-white border-[#652D3C]' 
                      : 'bg-[#FAF7F2] text-[#292321] border-[#E8DED2] hover:border-[#652D3C]'
                  }`}
                >
                  {lang === 'bn' ? v.colorBn : v.colorEn} ({v.size})
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold">স্টক স্ট্যাটাস:</span>
            {selectedVariant.stock > 0 ? (
              <span className="text-green-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> স্টকে আছে ({selectedVariant.stock} টি অবশিষ্ট)
              </span>
            ) : (
              <span className="text-red-600 font-semibold">স্টক শেষ</span>
            )}
          </div>
        </div>

        {/* Description & Fabric Specs */}
        <div className="space-y-2 text-xs text-[#292321]/80 leading-relaxed">
          <p className="font-semibold text-[#652D3C]">পোশাকের বিবরণ:</p>
          <p>{lang === 'bn' ? product.descriptionBn : product.descriptionEn}</p>
          <div className="bg-[#FAF7F2] p-3 rounded-lg space-y-1 mt-2 border">
            <p><span className="font-bold text-[#652D3C]">ফেব্রিক:</span> {product.fabricBn}</p>
            <p><span className="font-bold text-[#652D3C]">যত্ন নির্দেশিকা:</span> {product.careBn}</p>
          </div>
        </div>

        {/* Add to Cart Controls */}
        <div className="pt-4 flex gap-4">
          <button
            onClick={() => onAddToCart(product, selectedVariant, qty)}
            disabled={selectedVariant.stock < 1}
            className="flex-1 py-3 bg-[#652D3C] text-white font-bold text-sm rounded-lg hover:bg-[#A55C4B] transition shadow-md disabled:bg-gray-300 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>কার্টে যোগ করুন</span>
          </button>
          
          <button 
            onClick={() => onWishlist(product)}
            className={`p-3 rounded-lg border transition ${isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : 'border-[#E8DED2] text-[#292321]'}`}
          >
            <Heart className="w-5 h-5 fill-current" />
          </button>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// REUSABLE UI COMPONENT: CHECKOUT WORKFLOW
// ==========================================
function CheckoutSection({ cart, cartSubtotal, discountAmount, lang, t, formatMoney, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    name: '', phone: '', division: 'Chattogram', district: 'Feni', upazila: 'Feni Sadar', address: '', notes: '', locationType: 'insideFeni', paymentMethod: 'COD'
  });

  const deliveryFee = formData.locationType === 'insideFeni' ? siteConfig.shipping.insideFeni : siteConfig.shipping.outsideFeni;
  const grandTotal = cartSubtotal - discountAmount + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert(lang === 'bn' ? "অনুগ্রহ করে নাম, ফোন নম্বর এবং সম্পূর্ণ ঠিকানা দিন!" : "Please fill out all required fields!");
      return;
    }
    const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      alert(lang === 'bn' ? "সঠিক ১১ ডিজিটের ওয়াটারপ্রুফ বাংলাদেশী মোবাইল নম্বর দিন" : "Enter a valid 11-digit Bangladeshi mobile number");
      return;
    }

    const orderObj = {
      id: `order-${Date.now()}`,
      orderNumber: `SUTAR-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: formData.name,
      customerPhone: formData.phone,
      district: formData.district,
      upazila: formData.upazila,
      address: formData.address,
      items: cart.map(i => ({
        productId: i.product.id,
        titleBn: i.product.titleBn,
        variantInfo: `${i.variant.colorBn} (${i.variant.size})`,
        quantity: i.quantity,
        unitPrice: (i.product.salePrice || i.product.price) + (i.variant.priceAdjustment || 0)
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      discount: discountAmount,
      grandTotal,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === 'COD' ? 'UNPAID' : 'PAID_VERIFIED',
      orderStatus: 'PROCESSING',
      createdAt: new Date().toLocaleString()
    };

    onOrderPlaced(orderObj);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-serif font-bold text-[#652D3C] mb-6 flex items-center gap-2">
        <CreditCard className="w-6 h-6" />
        <span>{t.checkout.title}</span>
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Customer Address Details Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#E8DED2] space-y-4">
          <h2 className="text-sm font-bold text-[#652D3C] uppercase tracking-wider border-b pb-2">গ্রাহকের ডেলিভারি ঠিকানা</h2>

          <div className="space-y-1">
            <label className="text-xs font-semibold">{t.checkout.name} *</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full border px-3 py-2 text-xs rounded focus:outline-none focus:border-[#652D3C]"
              placeholder="যেমন: ফাতেমা জোহরা"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">{t.checkout.phone} *</label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full border px-3 py-2 text-xs rounded focus:outline-none focus:border-[#652D3C]"
              placeholder="01819000000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold">{t.checkout.district} *</label>
              <select 
                value={formData.district}
                onChange={e => setFormData({ ...formData, district: e.target.value })}
                className="w-full border px-3 py-2 text-xs rounded focus:outline-none bg-white"
              >
                <option value="Feni">ফেনী (Feni)</option>
                <option value="Chattogram">চট্টগ্রাম (Chattogram)</option>
                <option value="Dhaka">ঢাকা (Dhaka)</option>
                <option value="Comilla">কুমিল্লা (Comilla)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">{t.checkout.upazila} *</label>
              <input 
                type="text" 
                required
                value={formData.upazila}
                onChange={e => setFormData({ ...formData, upazila: e.target.value })}
                className="w-full border px-3 py-2 text-xs rounded focus:outline-none"
                placeholder="যেমন: ফেনী সদর / সোনাগাজী"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold">{t.checkout.address} *</label>
            <textarea 
              required
              rows={3}
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full border px-3 py-2 text-xs rounded focus:outline-none"
              placeholder="বাড়ির নম্বর, রোড নম্বর, এলাকা বা ল্যান্ডমার্ক..."
            />
          </div>

          {/* Regional Delivery Type Selection */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold block">{t.checkout.locationType}</label>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <label className={`border p-3 rounded-lg flex items-center gap-2 cursor-pointer transition ${formData.locationType === 'insideFeni' ? 'border-[#652D3C] bg-[#FAF7F2]' : ''}`}>
                <input 
                  type="radio" 
                  name="loc" 
                  checked={formData.locationType === 'insideFeni'}
                  onChange={() => setFormData({ ...formData, locationType: 'insideFeni' })}
                />
                <span>{t.checkout.insideFeni}</span>
              </label>
              <label className={`border p-3 rounded-lg flex items-center gap-2 cursor-pointer transition ${formData.locationType === 'outsideFeni' ? 'border-[#652D3C] bg-[#FAF7F2]' : ''}`}>
                <input 
                  type="radio" 
                  name="loc" 
                  checked={formData.locationType === 'outsideFeni'}
                  onChange={() => setFormData({ ...formData, locationType: 'outsideFeni' })}
                />
                <span>{t.checkout.outsideFeni}</span>
              </label>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2 pt-2 border-t">
            <label className="text-xs font-bold text-[#652D3C] block">পেমেন্ট পদ্ধতি</label>
            <div className="space-y-2 text-xs">
              <label className="border p-3 rounded-lg flex items-center gap-3 cursor-pointer bg-white">
                <input 
                  type="radio" 
                  name="pay" 
                  checked={formData.paymentMethod === 'COD'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                />
                <div>
                  <p className="font-bold">{t.checkout.cod}</p>
                  <p className="text-[10px] text-[#292321]/60">পণ্য হাতে পেয়ে টাকা পরিশোধ করুন</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Review Side Card */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#E8DED2] h-fit space-y-4">
          <h2 className="text-sm font-bold text-[#652D3C] border-b pb-2">আপনার অর্ডার</h2>
          
          <div className="space-y-3 max-h-60 overflow-y-auto text-xs pr-1">
            {cart.map(item => (
              <div key={`${item.product.id}-${item.variant.id}`} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-bold">{item.product.titleBn}</p>
                  <p className="text-[10px] text-gray-500">{item.variant.colorBn} x {item.quantity}</p>
                </div>
                <span className="font-bold">{formatMoney(((item.product.salePrice || item.product.price) + item.variant.priceAdjustment) * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs border-t pt-3">
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span>{formatMoney(cartSubtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>ছাড়</span>
                <span>- {formatMoney(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ</span>
              <span>{formatMoney(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#652D3C] border-t pt-2">
              <span>সর্বমোট প্রদেয়</span>
              <span>{formatMoney(grandTotal)}</span>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-[#652D3C] text-white font-bold text-sm rounded shadow hover:bg-[#A55C4B] transition"
          >
            {t.checkout.confirm}
          </button>
        </div>

      </form>
    </div>
  );
}