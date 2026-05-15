document.addEventListener('DOMContentLoaded', () => {
    // 0. Global Cart State
    let cart = JSON.parse(localStorage.getItem('denimCart')) || [];

    function saveCart() {
        localStorage.setItem('denimCart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cartCountEl = document.querySelector('.cart-count');
        if (cartCountEl) {
            cartCountEl.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }
    
    // Khởi tạo hiển thị giỏ hàng
    updateCartCount();

    // 1. Sticky Header Logic
    const header = document.getElementById('main-header');

    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Mock Data: 
    const productData = [
        //--- ĐỒ NAM ---
        //---aothun---
        { name: "Áo Thun Nam Basic", price: "250,000đ", oldPrice: "300,000đ", category: "nam", sub: "Áo thun", img1: "img/nam/ao-thun/aothunnam1.jpg", img2: "img/nam/ao-thun/aothunnam2.jpg", badge: "-15%" },
        { name: "Áo Thun Nam In Họa Tiết", price: "350,000đ", oldPrice: "", category: "nam", sub: "Áo thun", img1: "img/nam/ao-thun/aothunnam3.jpg", img2: "img/nam/ao-thun/aothunnam4.jpg", badge: "New" },
        { name: "Áo Thun Nam Basic", price: "280,000đ", oldPrice: "", category: "nam", sub: "Áo thun", img1: "img/nam/ao-thun/aothunnam5.jpg", img2: "img/nam/ao-thun/aothunnam6.jpg", badge: "" },
        { name: "Áo Thun Nam thời trang", price: "320,000đ", oldPrice: "", category: "nam", sub: "Áo thun", img1: "img/nam/ao-thun/aothunnam7.jpg", img2: "img/nam/ao-thun/aothunnam8.jpg", badge: "" },
        { name: "Áo Thun Nam thời trang", price: "320,000đ", oldPrice: "", category: "nam", sub: "Áo thun", img1: "img/nam/ao-thun/aothunnam9.jpg", img2: "img/nam/ao-thun/aothunnam10.jpg", badge: "" },
        
        //---quantay---
        { name: "Quần Tây Nam Form Chuẩn", price: "750,000đ", oldPrice: "", category: "nam", sub: "Quần tây", img1: "img/nam/quan-tay/quantay1.jpg", img2: "img/nam/quan-tay/quantay2.jpg", badge: "New" },
        { name: "Quần Tây Ống Rộng", price: "480,000đ", oldPrice: "", category: "nam", sub: "Quần tây", img1: "img/nam/quan-tay/quantay3.jpg", img2: "img/nam/quan-tay/quantay4.jpg", badge: "" },
        { name: "Quần Tây Ống Rộng", price: "520,000đ", oldPrice: "", category: "nam", sub: "Quần tây", img1: "img/nam/quan-tay/quantay5.jpg", img2: "img/nam/quan-tay/quantay6.jpg", badge: "Hot" },
        { name: "Quần Tây Ống Rộng", price: "450,000đ", oldPrice: "550,000đ", category: "nam", sub: "Quần tây", img1: "img/nam/quan-tay/quantay7.jpg", img2: "img/nam/quan-tay/quantay8.jpg", badge: "Sale" },
        { name: "Quần Tây Ống Rộng", price: "520,000đ", oldPrice: "", category: "nam", sub: "Quần tây", img1: "img/nam/quan-tay/quantay9.jpg", img2: "img/nam/quan-tay/quantay10.jpg", badge: "Hot" },
        
        //---quan jean---
        { name: "Quần Jean Thời Trang", price: "550,000đ", oldPrice: "700,000đ", category: "nam", sub: "Quần jean", img1: "img/nam/quan-jean/Jeannam1.jpg", img2: "img/nam/quan-jean/Jeannam2.jpg", badge: "-20%" },
        { name: "Quần Jean Ống Suông", price: "580,000đ", oldPrice: "", category: "nam", sub: "Quần jean", img1: "img/nam/quan-jean/Jeannam3.jpg", img2: "img/nam/quan-jean/Jeannam4.jpg", badge: "" },
        { name: "Quần Jean Ống Suông", price: "600,000đ", oldPrice: "", category: "nam", sub: "Quần jean", img1: "img/nam/quan-jean/Jeannam5.jpg", img2: "img/nam/quan-jean/Jeannam6.jpg", badge: "New" },
        { name: "Quần Jean Basic", price: "500,000đ", oldPrice: "", category: "nam", sub: "Quần jean", img1: "img/nam/quan-jean/Jeannam7.jpg", img2: "img/nam/quan-jean/Jeannam8.jpg", badge: "" },
        { name: "Quần Jean Ống Suông", price: "580,000đ", oldPrice: "", category: "nam", sub: "Quần jean", img1: "img/nam/quan-jean/Jeannam9.jpg", img2: "img/nam/quan-jean/Jeannam10.jpg", badge: "Hot" },
        { name: "Quần Jean Ống Suông", price: "580,000đ", oldPrice: "", category: "nam", sub: "Quần jean", img1: "img/nam/quan-jean/Jeannam11.jpg", img2: "img/nam/quan-jean/Jeannam12.jpg", badge: "Hot" },
        
        //---aokhoac---
        { name: "Áo Khoác Bomber", price: "850,000đ", oldPrice: "1,000,000đ", category: "nam", sub: "Áo khoác", img1: "img/nam/ao-khoac/Khoacbomber1.jpg", img2: "img/nam/ao-khoac/Khoacbomber2.jpg", badge: "Sale" },
        { name: "Áo Khoác Bomber", price: "850,000đ", oldPrice: "1,000,000đ", category: "nam", sub: "Áo khoác", img1: "img/nam/ao-khoac/Khoacbomber3.jpg", img2: "img/nam/ao-khoac/Khoacbomber4.jpg", badge: "Sale" },
        { name: "Áo Khoác Hoodie Nam", price: "750,000đ", oldPrice: "", category: "nam", sub: "Áo khoác", img1: "img/nam/ao-khoac/Hoodienam1.jpg", img2: "img/nam/ao-khoac/Hoodienam2.jpg", badge: "New" },
        { name: "Áo Khoác Thể Thao", price: "600,000đ", oldPrice: "", category: "nam", sub: "Áo khoác", img1: "img/nam/ao-khoac/Khoacnam1.jpg", img2: "img/nam/ao-khoac/Khoacnam2.jpg", badge: "New" },
        { name: "Áo Khoác Hoodie Nam", price: "600,000đ", oldPrice: "", category: "nam", sub: "Áo khoác", img1: "img/nam/ao-khoac/Hoodienam3.jpg", img2: "img/nam/ao-khoac/Hoodienam4.jpg", badge: "Hot" },
        { name: "Áo Khoác Jean Nam", price: "800,000đ", oldPrice: "", category: "nam", sub: "Áo khoác", img1: "img/nam/ao-khoac/KhoacJeannam1.jpg", img2: "img/nam/ao-khoac/KhoacJeannam2.jpg", badge: "Hot" },
        
        //---quanaothudong---
        { name: "Áo Len Hàn Quốc", price: "450,000đ", oldPrice: "", category: "nam", sub: "Quần áo thu đông", img1: "img/nam/do-thu-dong/len1.jpg", img2: "img/nam/do-thu-dong/len2.jpg", badge: "" },
        { name: "Áo Len Cổ Lọ", price: "550,000đ", oldPrice: "650,000đ", category: "nam", sub: "Quần áo thu đông", img1: "img/nam/do-thu-dong/colo1.jpg", img2: "img/nam/do-thu-dong/colo2.jpg", badge: "-15%" },
        { name: "Áo Thu Đông phong cách Hàn Quốc", price: "400,000đ", oldPrice: "", category: "nam", sub: "Quần áo thu đông", img1: "img/nam/do-thu-dong/hq1.jpg", img2: "img/nam/do-thu-dong/hq2.jpg", badge: "New" },
        { name: "Áo Len Cổ Lọ", price: "550,000đ", oldPrice: "650,000đ", category: "nam", sub: "Quần áo thu đông", img1: "img/nam/do-thu-dong/colo3.jpg", img2: "img/nam/do-thu-dong/colo4.jpg", badge: "-15%" },
        { name: "Áo Thu Đông phong cách Hàn Quốc", price: "500,000đ", oldPrice: "", category: "nam", sub: "Quần áo thu đông", img1: "img/nam/do-thu-dong/hq3.jpg", img2: "img/nam/do-thu-dong/hq4.jpg", badge: "Hot" },
        { name: "Áo Len Hàn Quốc", price: "450,000đ", oldPrice: "", category: "nam", sub: "Quần áo thu đông", img1: "img/nam/do-thu-dong/len3.jpg", img2: "img/nam/do-thu-dong/len4.jpg", badge: "" },

        
        //---giay---
        { name: "Giày Sneaker Thể Thao", price: "850,000đ", oldPrice: "1,100,000đ", category: "nam", sub: "Giày", img1: "img/nam/giay/giaynam1.jpg", img2: "img/nam/giay/giaynam2.jpg", badge: "Sale" },       
        { name: "Giày Sneaker Thể Thao", price: "750,000đ", oldPrice: "", category: "nam", sub: "Giày", img1: "img/nam/giay/giaynam3.jpg", img2: "img/nam/giay/giaynam4.jpg", badge: "New" },       
        { name: "Giày Sneaker Thể Thao", price: "850,000đ", oldPrice: "1,000,000đ", category: "nam", sub: "Giày", img1: "img/nam/giay/giaynam5.jpg", img2: "img/nam/giay/giaynam6.jpg", badge: "Sale" },       
        { name: "Giày Sneaker Thể Thao", price: "750,000đ", oldPrice: "", category: "nam", sub: "Giày", img1: "img/nam/giay/giaynam7.jpg", img2: "img/nam/giay/giaynam8.jpg", badge: "New" },       
        { name: "Giày Sneaker Thể Thao", price: "750,000đ", oldPrice: "", category: "nam", sub: "Giày", img1: "img/nam/giay/giaynam9.jpg", img2: "img/nam/giay/giaynam10.jpg", badge: "New" },       
       
        
        
        //---mu---
        { name: "Mũ Lưỡi Trai Classic", price: "150,000đ", oldPrice: "", category: "nam", sub: "Mũ", img1: "img/nam/mu/munam1.jpg", img2: "img/nam/mu/munam2.jpg", badge: "New" },
        { name: "Mũ Bucket Hiphop", price: "200,000đ", oldPrice: "250,000đ", category: "nam", sub: "Mũ", img1: "img/nam/mu/munam3.jpg", img2: "img/nam/mu/munam4.jpg", badge: "-20%" },
        { name: "Mũ Lưỡi Trai classic", price: "180,000đ", oldPrice: "", category: "nam", sub: "Mũ", img1: "img/nam/mu/munam5.jpg", img2: "img/nam/mu/mu-luoi-trai-1.jpg", badge: "New" },

        // --- ĐỒ NỮ ---
        //---aothun---
        { name: "Áo Thun Form rộng", price: "175,000đ", oldPrice: "", category: "nu", sub: "Áo thun", img1: "img/nu/ao-thun/aothun1.jpg",img2: "img/nu/ao-thun/aothun2.jpg", badge: "Hot" },
        { name: "Áo Thun Form rộng", price: "195,000đ", oldPrice: "", category: "nu", sub: "Áo thun", img1: "img/nu/ao-thun/aothun3.jpg",img2: "img/nu/ao-thun/aothun4.jpg", badge: "Hot" },
        { name: "Áo Thun Form rộng", price: "180,000đ", oldPrice: "", category: "nu", sub: "Áo thun", img1: "img/nu/ao-thun/aothun5.jpg", img2: "img/nu/ao-thun/aothun6.jpg", badge: "Hot" },
        { name: "Áo Thun Form Rộng", price: "220,000đ", oldPrice: "280,000đ", category: "nu", sub: "Áo thun", img1: "img/nu/ao-thun/aothun7.jpg", img2: "img/nu/ao-thun/aothun8.jpg", badge: "Sale" },
        { name: "Áo Thun Form rộng", price: "200,000đ", oldPrice: "", category: "nu", sub: "Áo thun", img1: "img/nu/ao-thun/aothun9.jpg", img2: "img/nu/ao-thun/aothun10.jpg", badge: "" },
        { name: "Áo Thun Form rộng", price: "185,000đ", oldPrice: "", category: "nu", sub: "Áo thun", img1: "img/nu/ao-thun/aothun11.jpg", img2: "img/nu/ao-thun/aothun12.jpg", badge: "" },
        
        //---quan---
        { name: "Quần Ống Suông Nữ", price: "350,000đ", oldPrice: "", category: "nu", sub: "Quần", img1: "img/nu/quan/quandai1.jpg", img2: "img/nu/quan/quandai2.jpg", badge: "" },
        { name: "Quần Ống Suông Nữ", price: "350,000đ", oldPrice: "", category: "nu", sub: "Quần", img1: "img/nu/quan/quandai3.jpg", img2: "img/nu/quan/quandai4.jpg", badge: "" },
        { name: "Quần Ống Suông Nữ", price: "350,000đ", oldPrice: "", category: "nu", sub: "Quần", img1: "img/nu/quan/quandai5.jpg", img2: "img/nu/quan/quandai6.jpg", badge: "" },
        { name: "Quần Short Nữ", price: "250,000đ", oldPrice: "300,000đ", category: "nu", sub: "Quần", img1: "img/nu/quan/quanngan1.jpg", img2: "img/nu/quan/quanngan2.jpg", badge: "-15%" },
        { name: "Quần Short Nữ", price: "250,000đ", oldPrice: "300,000đ", category: "nu", sub: "Quần", img1: "img/nu/quan/quanngan3.jpg", img2: "img/nu/quan/quanngan4.jpg", badge: "-15%" },
        
        //---vay---
        { name: "Chân Váy Ngắn", price: "280,000đ", oldPrice: "", category: "nu", sub: "Váy", img1: "img/nu/vay/chanvay1.jpg", img2: "img/nu/vay/chanvay2.jpg", badge: "" },
        { name: "Chân Váy Xếp Ly", price: "250,000đ", oldPrice: "", category: "nu", sub: "Váy", img1: "img/nu/vay/chanvay3.jpg", img2: "img/nu/vay/chanvay4.jpg", badge: "" },
        { name: "Chân Váy Jean", price: "320,000đ", oldPrice: "400,000đ", category: "nu", sub: "Váy", img1: "img/nu/vay/chanvay5.jpg", img2: "img/nu/vay/chanvay6.jpg", badge: "Sale" },
        { name: "Chân Váy Jean", price: "550,000đ", oldPrice: "", category: "nu", sub: "Váy", img1: "img/nu/vay/chanvay7.jpg", img2: "img/nu/vay/chanvay8.jpg", badge: "Hot" },
        { name: "Chân Váy Jean", price: "450,000đ", oldPrice: "600,000đ", category: "nu", sub: "Váy", img1: "img/nu/vay/chanvay9.jpg", img2: "img/nu/vay/chanvay10.jpg", badge: "-25%" },
        
        //---vaylien---
        { name: "Váy Liền Vintage", price: "525,000đ", oldPrice: "700,000đ", category: "nu", sub: "Váy liền", img1: "img/nu/vay-lien/vaylien1.jpg", img2: "img/nu/vay-lien/vaylien2.jpg", badge: "-25%" },
        { name: "Váy Liền Thân HQ", price: "525,000đ", oldPrice: "", category: "nu", sub: "Váy liền", img1: "img/nu/vay-lien/vaylien3.jpg", img2: "img/nu/vay-lien/vaylien4.jpg", badge: "" },
        { name: "Váy Liền Thân HQ", price: "555,000đ", oldPrice: "", category: "nu", sub: "Váy liền", img1: "img/nu/vay-lien/vaylien5.jpg", img2: "img/nu/vay-lien/vaylien6.jpg", badge: "" },
        { name: "Váy Liền Thân HQ", price: "725,000đ", oldPrice: "", category: "nu", sub: "Váy liền", img1: "img/nu/vay-lien/vaylien7.jpg", img2: "img/nu/vay-lien/vaylien8.jpg", badge: "" },
        { name: "Váy Liền Thân HQ", price: "625,000đ", oldPrice: "", category: "nu", sub: "Váy liền", img1: "img/nu/vay-lien/vaylien9.jpg", img2: "img/nu/vay-lien/vaylien10.jpg", badge: "" },


        //---ao khoac ---
        { name: "Áo Khoác Cardigan", price: "400,000đ", oldPrice: "", category: "nu", sub: "Áo khoác", img1: "img/nu/ao-khoac/cardigan1.jpg", img2: "img/nu/ao-khoac/cardigan2.jpg", badge: "" },
        { name: "Áo Khoác Hoodie zip Nữ", price: "350,000đ", oldPrice: "", category: "nu", sub: "Áo khoác", img1: "img/nu/ao-khoac/Hoodiezip1.jpg", img2: "img/nu/ao-khoac/Hoodiezip2.jpg", badge: "New" },
        { name: "Áo Khoác Jean Nữ", price: "500,000đ", oldPrice: "650,000đ", category: "nu", sub: "Áo khoác", img1: "img/nu/ao-khoac/KhoacJean1.jpg", img2: "img/nu/ao-khoac/KhoacJean2.jpg", badge: "Sale" },
        { name: "Áo Khoác Có Khóa Kéo", price: "300,000đ", oldPrice: "", category: "nu", sub: "Áo khoác", img1: "img/nu/ao-khoac/Khoac1.jpg", img2: "img/nu/ao-khoac/Khoac2.jpg", badge: "" },
        { name: "Áo Khoác Bomber Nữ", price: "400,000đ", oldPrice: "", category: "nu", sub: "Áo khoác", img1: "img/nu/ao-khoac/boomer1.jpg", img2: "img/nu/ao-khoac/boomer2.jpg", badge: "" },


        //---giay---
        { name: "Giày Cao Gót", price: "550,000đ", oldPrice: "", category: "nu", sub: "Giày", img1: "img/nu/giay/caogot1.jpg", img2: "img/nu/giay/caogot2.jpg", badge: "" },
        { name: "Giày Cao Gót", price: "550,000đ", oldPrice: "", category: "nu", sub: "Giày", img1: "img/nu/giay/caogot3.jpg", img2: "img/nu/giay/caogot4.jpg", badge: "" },
        { name: "Giày Bata Nữ", price: "300,000đ", oldPrice: "", category: "nu", sub: "Giày", img1: "img/nu/giay/bata1.jpg", img2: "img/nu/giay/bata2.jpg", badge: "" },
        { name: "Giày Bata Nữ", price: "320,000đ", oldPrice: "", category: "nu", sub: "Giày", img1: "img/nu/giay/bata3.jpg", img2: "img/nu/giay/bata4.jpg", badge: "" },
        { name: "Giày Búp Bê Dịu Dàng", price: "280,000đ", oldPrice: "350,000đ", category: "nu", sub: "Giày", img1: "img/nu/giay/giayxinh1.jpg", img2: "img/nu/giay/giayxinh2.jpg", badge: "Sale" },
        
        //---phu kien---
        { name: "Dây chuyền thời trang", price: "150,000đ", oldPrice: "250,000đ", category: "nu", sub: "Phụ kiện", img1: "img/nu/phu-kien/daychuyen2.jpg", img2: "img/nu/phu-kien/daychuyen1.jpg", badge: "Sale" },
        { name: "Vòng tay thời trang", price: "170,000đ", oldPrice: "", category: "nu", sub: "Phụ kiện", img1: "img/nu/phu-kien/vongtay1.jpg", img2: "img/nu/phu-kien/vongtay2.jpg", badge: "Hot" },
        { name: "Khuyên tai bạc 925", price: "300,000đ", oldPrice: "", category: "nu", sub: "Phụ kiện", img1: "img/nu/phu-kien/hoatai1.jpg", img2: "img/nu/phu-kien/hoatai2.jpg", badge: "Hot" },
        { name: "Phụ kiện tóc", price: "30,000đ", oldPrice: "", category: "nu", sub: "Phụ kiện", img1: "img/nu/phu-kien/no1.jpg", img2: "img/nu/phu-kien/no2.jpg", badge: "Hot" },
        { name: "Nhẫn thời trang", price: "250,000đ", oldPrice: "", category: "nu", sub: "Phụ kiện", img1: "img/nu/phu-kien/nhan1.jpg", img2: "img/nu/phu-kien/nhan2.jpg", badge: "Hot" },
        { name: "Nhẫn thời trang", price: "250,000đ", oldPrice: "", category: "nu", sub: "Phụ kiện", img1: "img/nu/phu-kien/nhan3.jpg", img2: "img/nu/phu-kien/nhan4.jpg", badge: "Hot" },

        

        //---do thu dong---
        { name: "Quấn áo thu đông Xinh", price: "950,000đ", oldPrice: "", category: "nu", sub: "Quần áo thu đông", img1: "img/nu/do-thu-dong/dothudong1.jpg", img2: "img/nu/do-thu-dong/dothudong2.jpg", badge: "New" },
        { name: "Quần áo thu đông thời trang", price: "1,200,000đ", oldPrice: "1,500,000đ", category: "nu", sub: "Quần áo thu đông", img1: "img/nu/do-thu-dong/dothudong9.jpg", img2: "img/nu/do-thu-dong/dothudong10.jpg", badge: "Sale" },
        { name: "Quấn áo thu đông thời trang", price: "850,000đ", oldPrice: "", category: "nu", sub: "Quần áo thu đông", img1: "img/nu/do-thu-dong/dothudong3.jpg", img2: "img/nu/do-thu-dong/dothudong4.jpg", badge: "New" },
        { name: "Quấn áo thu đông thời trang", price: "650,000đ", oldPrice: "", category: "nu", sub: "Quần áo thu đông", img1: "img/nu/do-thu-dong/dothudong5.jpg", img2: "img/nu/do-thu-dong/dothudong6.jpg", badge: "New" },
        { name: "Quấn áo thu đông thời trang", price: "650,000đ", oldPrice: "", category: "nu", sub: "Quần áo thu đông", img1: "img/nu/do-thu-dong/dothudong7.jpg", img2: "img/nu/do-thu-dong/dothudong8.jpg", badge: "New" },
        
        //---tuinu---
        { name: "Túi Xách Nữ thời trang", price: "350,000đ", oldPrice: "", category: "nu", sub: "Túi Xách", img1: "img/nu/tuixach/tui1.jpg", img2: "img/nu/tuixach/tui2.jpg", badge: "New" },
        { name: "Túi Xách Nữ thời trang", price: "250,000đ", oldPrice: "", category: "nu", sub: "Túi Xách", img1: "img/nu/tuixach/tui3.jpg", img2: "img/nu/tuixach/tui4.jpg", badge: "New" },        
        { name: "Túi Xách Nữ thời trang", price: "350,000đ", oldPrice: "", category: "nu", sub: "Túi Xách", img1: "img/nu/tuixach/tui5.jpg", img2: "img/nu/tuixach/tui6.jpg", badge: "New" },        
        { name: "Túi Xách Nữ thời trang", price: "450,000đ", oldPrice: "", category: "nu", sub: "Túi Xách", img1: "img/nu/tuixach/tui7.jpg", img2: "img/nu/tuixach/tui8.jpg", badge: "New" },        
        { name: "Túi Xách Nữ thời trang", price: "450,000đ", oldPrice: "", category: "nu", sub: "Túi Xách", img1: "img/nu/tuixach/tui9.jpg", img2: "img/nu/tuixach/tui10.jpg", badge: "New" },        

    ];

    // Ensure all products have IDs
    productData.forEach((product, index) => {
        product.id = index;
    });

    // Function to generate product HTML
    function createProductHtml(product) {
        let badgeHtml = '';
        if (product.badge) {
            let badgeClass = product.badge.includes('%') || product.badge.toLowerCase() === 'sale' ? 'sale' : 'new';
            badgeHtml = `<div class="product-badges"><span class="badge ${badgeClass}">${product.badge}</span></div>`;
        }

        let priceHtml = `<span class="price-current">${product.price}</span>`;
        if (product.oldPrice) {
            priceHtml += `<span class="price-old">${product.oldPrice}</span>`;
        }

        return `
            <div class="product-card" data-category="${product.category}" data-sub="${product.sub}">
                <div class="product-image">
                    <img class="img-primary" src="${product.img1}" alt="${product.name}">
                    <img class="img-secondary" src="${product.img2}" alt="${product.name} Hover">
                    ${badgeHtml}
                    <div class="product-actions">
                        <button class="btn-icon add-to-cart-btn" data-id="${product.id}" title="Thêm vào giỏ hàng"><i class="ph ph-shopping-cart-simple"></i></button>
                        <button class="btn-icon" title="Yêu thích"><i class="ph ph-heart"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title"><a href="product-detail.html">${product.name}</a></h3>
                    <div class="product-price">
                        ${priceHtml}
                    </div>
                </div>
            </div>
        `;
    }

    // Bind Add to Cart logic
    function bindAddToCartEvents(container) {
        container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const product = productData.find(p => p.id === id);
                if(product) {
                    const existing = cart.find(i => i.name === product.name);
                    if(existing) {
                        existing.quantity += 1;
                    } else {
                        cart.push({ ...product, quantity: 1 });
                    }
                    saveCart();
                    updateCartCount();
                    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
                }
            });
        });
    }

    // --- LOGIC TRANG CHỦ: CATEGORY TABS + PRODUCT SLIDE ---
    const catTabs = document.getElementById('cat-tabs');
    const catTrack = document.getElementById('cat-product-track');
    const catPrev = document.getElementById('cat-prev');
    const catNext = document.getElementById('cat-next');
    const catViewAll = document.getElementById('cat-view-all');

    if (catTabs && catTrack) {
        let catOffset = 0;
        const itemWidth = 260; // card width + gap
        const visibleCount = 4;

        function loadCatProducts(sub) {
            const filtered = productData.filter(p => p.sub === sub);
            catTrack.innerHTML = filtered.map(p => {
                const badge = p.badge ? `<div class="product-badges"><span class="badge ${p.badge.includes('%') || p.badge.toLowerCase()==='sale'?'sale':'new'}">${p.badge}</span></div>` : '';
                const oldP = p.oldPrice ? `<span class="price-old">${p.oldPrice}</span>` : '';
                return `<div class="product-card" style="min-width:240px;flex-shrink:0;" data-category="${p.category}" data-sub="${p.sub}">
                    <div class="product-image">
                        <img class="img-primary" src="${p.img1}" alt="${p.name}">
                        <img class="img-secondary" src="${p.img2}" alt="${p.name}">
                        ${badge}
                        <div class="product-actions">
                            <button class="btn-icon add-to-cart-btn" data-id="${p.id}" title="Thêm vào giỏ"><i class="ph ph-shopping-cart-simple"></i></button>
                            <button class="btn-icon" title="Yêu thích"><i class="ph ph-heart"></i></button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name"><a href="product-detail.html?id=${p.id}">${p.name}</a></h3>
                        <div class="product-price"><span class="price-current">${p.price}</span>${oldP}</div>
                    </div>
                </div>`;
            }).join('');
            catOffset = 0;
            catTrack.style.transform = 'translateX(0)';
            bindAddToCartEvents(catTrack);
            // update view all link
            if (catViewAll) catViewAll.href = `products.html?sub=${encodeURIComponent(sub)}`;
        }

        catTabs.querySelectorAll('.cat-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                catTabs.querySelectorAll('.cat-tab-btn').forEach(b => {
                    b.style.background = '#fff';
                    b.style.color = 'var(--color-text)';
                    b.style.borderColor = 'var(--color-border)';
                });
                btn.style.background = 'var(--color-primary)';
                btn.style.color = '#fff';
                btn.style.borderColor = 'var(--color-primary)';
                loadCatProducts(btn.dataset.sub);
            });
        });

        if (catPrev) catPrev.addEventListener('click', () => {
            const maxOffset = 0;
            catOffset = Math.min(catOffset + itemWidth, maxOffset);
            catTrack.style.transform = `translateX(${catOffset}px)`;
        });
        if (catNext) catNext.addEventListener('click', () => {
            const cards = catTrack.querySelectorAll('.product-card');
            const maxOffset = -((cards.length - visibleCount) * itemWidth);
            catOffset = Math.max(catOffset - itemWidth, maxOffset);
            catTrack.style.transform = `translateX(${catOffset}px)`;
        });

        // Load default tab
        loadCatProducts('Áo thun');
    }

    // Contact form handler
    const contactHomeForm = document.getElementById('contact-home-form');
    if (contactHomeForm) {
        contactHomeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn! Đội ngũ tư vấn sẽ liên hệ sớm nhất có thể và gửi Voucher 10% qua email!');
            contactHomeForm.reset();
        });
    }

    // --- LOGIC CHO TRANG SẢN PHẨM (products.html) ---
    const productsPageGrid = document.getElementById('products-page-grid');
    if (productsPageGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        let currentGender = urlParams.get('gender'); // 'nam' or 'nu' or null
        let currentSub = urlParams.get('sub'); // specific subcategory or null
        let currentPriceFilter = 'all';

        // Set page title
        const pageTitle = document.getElementById('page-title');
        if (currentSub) {
            pageTitle.textContent = currentSub;
        } else if (currentGender === 'nam') {
            pageTitle.textContent = 'Đồ Nam';
        } else if (currentGender === 'nu') {
            pageTitle.textContent = 'Đồ Nữ';
        }

        // Render Categories Filter in Sidebar
        const filterCategoriesList = document.getElementById('filter-categories');
        const subs = [...new Set(productData.map(p => p.sub))];
        let catHtml = `<li><label><input type="radio" name="subcat" value="all" ${!currentSub ? 'checked' : ''}> Tất cả danh mục</label></li>`;
        subs.forEach(sub => {
            const isChecked = currentSub === sub ? 'checked' : '';
            catHtml += `<li><label><input type="radio" name="subcat" value="${sub}" ${isChecked}> ${sub}</label></li>`;
        });
        filterCategoriesList.innerHTML = catHtml;

        function renderProductsPage() {
            productsPageGrid.innerHTML = '';
            
            // Apply filters
            let filtered = productData;
            
            // Gender filter (from URL)
            if (currentGender) {
                filtered = filtered.filter(p => p.category === currentGender);
            }

            // Sub filter (from URL or Sidebar)
            if (currentSub && currentSub !== 'all') {
                filtered = filtered.filter(p => p.sub === currentSub);
            }

            // Price filter
            if (currentPriceFilter !== 'all') {
                const [minStr, maxStr] = currentPriceFilter.split('-');
                const min = parseInt(minStr);
                const max = parseInt(maxStr);
                
                filtered = filtered.filter(p => {
                    const priceNum = parseInt(p.price.replace(/,/g, '').replace('đ', ''));
                    return priceNum >= min && priceNum <= max;
                });
            }

            // Render
            if (filtered.length === 0) {
                document.getElementById('no-products-msg').style.display = 'block';
            } else {
                document.getElementById('no-products-msg').style.display = 'none';
                filtered.forEach(product => {
                    productsPageGrid.innerHTML += createProductHtml(product);
                });
                bindAddToCartEvents(productsPageGrid);
            }
        }

        // Initial render
        renderProductsPage();

        // Bind filter events
        document.querySelectorAll('input[name="subcat"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                currentSub = e.target.value;
                // Optional: Update URL to reflect filter without reloading
                const url = new URL(window.location);
                if(currentSub === 'all') url.searchParams.delete('sub');
                else url.searchParams.set('sub', currentSub);
                window.history.pushState({}, '', url);
                
                renderProductsPage();
            });
        });

        document.querySelectorAll('input[name="price"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                currentPriceFilter = e.target.value;
                renderProductsPage();
            });
        });
    }

    // 4. Search Button Interaction (Demo)
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('Mở hộp thoại Tìm Kiếm');
        });
    }

    // 5. Slider Logic
    const slider = document.getElementById('hero-slider');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slider && prevBtn && nextBtn) {
        let currentSlide = 0;
        const totalSlides = 2; // Hardcoded based on index.html

        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach(dot => {
                dot.style.opacity = '0.5';
            });
            if(dots[currentSlide]) {
                dots[currentSlide].style.opacity = '1';
            }
        }

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentSlide = parseInt(e.target.getAttribute('data-index'));
                updateSlider();
            });
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
            updateSlider();
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
            updateSlider();
        }, 5000);
    }

    // --- LOGIC CHO TRANG GIỎ HÀNG (cart.html) ---
    const cartContainer = document.getElementById('cart-page-container');
    if (cartContainer) {
        function renderCartPage() {
            if (cart.length === 0) {
                cartContainer.innerHTML = '<p class="text-center">Giỏ hàng của bạn đang trống.</p><div class="text-center mt-40"><a href="index.html" class="btn btn-primary">Mua Sắm Ngay</a></div>';
                return;
            }

            let html = '<table class="cart-table" style="width:100%; text-align:left; border-collapse: collapse;">';
            html += '<tr style="border-bottom: 1px solid #ddd;"><th>Sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Thao tác</th></tr>';
            
            let total = 0;
            
            cart.forEach((item, index) => {
                const priceNum = parseInt(item.price.replace(/,/g, '').replace('đ', ''));
                total += priceNum * item.quantity;

                html += `
                    <tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 15px 0; display:flex; align-items:center; gap: 15px;">
                            <img src="${item.img1}" alt="${item.name}" style="width: 80px; height: 100px; object-fit: cover;">
                            <span>${item.name}</span>
                        </td>
                        <td>${item.price}</td>
                        <td>
                            <div style="display:flex; align-items:center; gap:10px;">
                                <button class="btn-qty decrease" data-index="${index}">-</button>
                                <span>${item.quantity}</span>
                                <button class="btn-qty increase" data-index="${index}">+</button>
                            </div>
                        </td>
                        <td>
                            <button class="btn-remove" data-index="${index}" style="color:red; background:none; border:none; cursor:pointer;">Xóa</button>
                        </td>
                    </tr>
                `;
            });
            html += '</table>';
            html += `
                <div style="text-align: right; margin-top: 20px; font-size: 20px;">
                    <strong>Tổng cộng: ${total.toLocaleString()}đ</strong>
                </div>
                <div style="text-align: right; margin-top: 20px;">
                    <a href="index.html" class="btn btn-outline" style="margin-right: 10px;">Tiếp tục mua hàng</a>
                    <button class="btn btn-primary" onclick="window.location.href='checkout-success.html'; localStorage.removeItem('denimCart');">Thanh toán</button>
                </div>
            `;
            cartContainer.innerHTML = html;

            // Bind events for cart actions
            document.querySelectorAll('.increase').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart[idx].quantity += 1;
                    saveCart();
                    updateCartCount();
                    renderCartPage();
                });
            });

            document.querySelectorAll('.decrease').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    if (cart[idx].quantity > 1) {
                        cart[idx].quantity -= 1;
                    } else {
                        cart.splice(idx, 1);
                    }
                    saveCart();
                    updateCartCount();
                    renderCartPage();
                });
            });

            document.querySelectorAll('.btn-remove').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    cart.splice(idx, 1);
                    saveCart();
                    updateCartCount();
                    renderCartPage();
                });
            });
        }
        renderCartPage();
    }
});
