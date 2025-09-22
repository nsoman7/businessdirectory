// Business Directory Application JavaScript

// Application Data
let businessesData = [
    {
        id: 1,
        name: "Soman's Organic Green Farms",
        category: "Agriculture",
        industry: "Organic Food Production",
        description: "Family-owned organic farm specializing in fresh vegetables, fruits, and herbs. We practice sustainable farming methods and provide farm-to-table produce.",
        phone: "(844) 601-8026",
        email: "info@greenvalleyorganic.com",
        website: "www.greenvalleyorganic.com",
        address: "Sathe Aali, Kelshi",
        products: ["Organic Vegetables", "Fresh Fruits", "Herbs", "Farm Eggs"],
        hours: "Mon-Fri: 8AM-6PM, Sat: 8AM-4PM, Sun: Closed",
        featured: true,
        rating: 4.8,
        logo: "🌱"
    },
    {
        id: 2,
        name: "TechSolutions Pro",
        category: "Technology",
        industry: "IT Services",
        description: "Professional IT consulting and software development services for small and medium businesses. Specializing in web development, cloud solutions, and cybersecurity.",
        phone: "(555) 234-5678",
        email: "contact@techsolutionspro.com",
        website: "www.techsolutionspro.com",
        address: "456 Tech Street, Silicon Valley, CA 94025",
        products: ["Web Development", "Cloud Migration", "Cybersecurity", "IT Consulting"],
        hours: "Mon-Fri: 9AM-5PM, Weekends: On-call support",
        featured: true,
        rating: 4.9,
        logo: "💻"
    },
    {
        id: 3,
        name: "Bella's Bakery & Cafe",
        category: "Food & Beverage",
        industry: "Restaurant/Bakery",
        description: "Artisan bakery serving fresh-baked breads, pastries, and gourmet coffee. We use locally sourced ingredients and traditional baking methods.",
        phone: "(555) 345-6789",
        email: "hello@bellasbakery.com",
        website: "www.bellasbakery.com",
        address: "789 Main Street, Downtown, CA 90210",
        products: ["Fresh Breads", "Pastries", "Coffee", "Sandwiches", "Custom Cakes"],
        hours: "Daily: 6AM-8PM",
        featured: false,
        rating: 4.7,
        logo: "🥖"
    },
    {
        id: 4,
        name: "Downtown Auto Repair",
        category: "Automotive",
        industry: "Auto Services",
        description: "Full-service automotive repair shop with certified mechanics. We handle everything from oil changes to major engine repairs with honest pricing.",
        phone: "(555) 456-7890",
        email: "service@downtownauto.com",
        website: "www.downtownauto.com",
        address: "321 Garage Way, Mechanic City, CA 91234",
        products: ["Oil Changes", "Brake Service", "Engine Repair", "Tire Service", "Diagnostics"],
        hours: "Mon-Fri: 7AM-6PM, Sat: 8AM-4PM, Sun: Closed",
        featured: false,
        rating: 4.6,
        logo: "🔧"
    },
    {
        id: 5,
        name: "Wellness Center Plus",
        category: "Healthcare",
        industry: "Health & Wellness",
        description: "Comprehensive wellness center offering physical therapy, massage therapy, and nutritional counseling to help you achieve optimal health.",
        phone: "(555) 567-8901",
        email: "info@wellnesscenterplus.com",
        website: "www.wellnesscenterplus.com",
        address: "654 Health Drive, Wellness Town, CA 92345",
        products: ["Physical Therapy", "Massage Therapy", "Nutrition Counseling", "Wellness Programs"],
        hours: "Mon-Thu: 8AM-7PM, Fri: 8AM-5PM, Sat: 9AM-2PM, Sun: Closed",
        featured: true,
        rating: 4.9,
        logo: "🏥"
    },
    {
        id: 6,
        name: "Creative Design Studio",
        category: "Professional Services",
        industry: "Graphic Design",
        description: "Award-winning design studio specializing in branding, web design, and marketing materials for businesses of all sizes.",
        phone: "(555) 678-9012",
        email: "creative@designstudio.com",
        website: "www.creativedesignstudio.com",
        address: "987 Creative Lane, Art District, CA 90028",
        products: ["Logo Design", "Website Design", "Print Design", "Branding", "Marketing Materials"],
        hours: "Mon-Fri: 9AM-6PM, Weekends: By appointment",
        featured: false,
        rating: 4.8,
        logo: "🎨"
    }
];

let categoriesData = [
    { name: "Agriculture", icon: "🌱", count: 1 },
    { name: "Technology", icon: "💻", count: 1 },
    { name: "Food & Beverage", icon: "🍽️", count: 1 },
    { name: "Automotive", icon: "🚗", count: 1 },
    { name: "Healthcare", icon: "🏥", count: 1 },
    { name: "Professional Services", icon: "💼", count: 1 },
    { name: "Retail", icon: "🏪", count: 0 },
    { name: "Education", icon: "🎓", count: 0 }
];

let currentContactBusinessId = null;
let nextBusinessId = 7;

// Make functions globally accessible
window.showSection = showSection;
window.showLegalTab = showLegalTab;
window.showAdminTab = showAdminTab;
window.showBusinessDetails = showBusinessDetails;
window.openContactModal = openContactModal;
window.closeModal = closeModal;
window.closeContactModal = closeContactModal;
window.performSearch = performSearch;
window.performAdvancedSearch = performAdvancedSearch;
window.searchByCategory = searchByCategory;
window.editBusiness = editBusiness;
window.deleteBusiness = deleteBusiness;

// Application Initialization
document.addEventListener('DOMContentLoaded', function() {
    loadStoredData();
    initializeApp();
    populateCategories();
    populateFeaturedBusinesses();
    populateAllCategories();
    updateStats();
    setupEventListeners();
});

// Load data from localStorage if available
function loadStoredData() {
    const storedBusinesses = localStorage.getItem('businessDirectory_businesses');
    const storedNextId = localStorage.getItem('businessDirectory_nextId');
    
    if (storedBusinesses) {
        businessesData = JSON.parse(storedBusinesses);
    }
    
    if (storedNextId) {
        nextBusinessId = parseInt(storedNextId);
    }
    
    updateCategoryCounts();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('businessDirectory_businesses', JSON.stringify(businessesData));
    localStorage.setItem('businessDirectory_nextId', nextBusinessId.toString());
}

// Update category counts based on current businesses
function updateCategoryCounts() {
    categoriesData.forEach(category => {
        category.count = businessesData.filter(business => business.category === category.name).length;
    });
}

// Initialize application
function initializeApp() {
    showSection('home');
    populateSearchCategories();
    populateAdminStats();
    populateBusinessList();
}

// Setup event listeners
function setupEventListeners() {
    // Form submissions
    document.getElementById('add-business-form').addEventListener('submit', handleAddBusiness);
    document.getElementById('contact-form').addEventListener('submit', handleContactSubmission);
    
    // Search on enter key
    document.getElementById('main-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    document.getElementById('location-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Add click handler for navbar brand
    document.querySelector('.navbar-brand').addEventListener('click', function() {
        showSection('home');
    });
}

// Section Navigation - Fixed
function showSection(sectionName) {
    console.log('Switching to section:', sectionName);
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section shown:', sectionName);
    } else {
        console.error('Section not found:', sectionName + '-section');
    }
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Special handling for search section
    if (sectionName === 'search') {
        // Make sure search results are shown
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.style.display = 'block';
        }
    }
}

// Tab Navigation for Legal and Admin sections - Fixed
function showLegalTab(tabName) {
    console.log('Switching to legal tab:', tabName);
    
    // Hide all legal tabs
    const tabs = document.querySelectorAll('.legal-tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    const targetTab = document.getElementById(tabName + '-tab');
    if (targetTab) {
        targetTab.classList.add('active');
        console.log('Legal tab shown:', tabName);
    } else {
        console.error('Legal tab not found:', tabName + '-tab');
    }
    
    // Update tab buttons
    const tabBtns = document.querySelectorAll('.legal-tabs .tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Find and activate the correct button
    const activeBtn = Array.from(tabBtns).find(btn => btn.textContent.toLowerCase().includes(tabName));
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function showAdminTab(tabName) {
    console.log('Switching to admin tab:', tabName);
    
    // Hide all admin tabs
    const tabs = document.querySelectorAll('.admin-tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    const targetTab = document.getElementById(tabName + '-tab');
    if (targetTab) {
        targetTab.classList.add('active');
        console.log('Admin tab shown:', tabName);
    } else {
        console.error('Admin tab not found:', tabName + '-tab');
    }
    
    // Update tab buttons
    const tabBtns = document.querySelectorAll('.admin-tabs .tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Find and activate the correct button
    const activeBtn = Array.from(tabBtns).find(btn => {
        const btnText = btn.textContent.toLowerCase();
        if (tabName === 'dashboard' && btnText.includes('dashboard')) return true;
        if (tabName === 'add-business' && btnText.includes('add business')) return true;
        if (tabName === 'manage-businesses' && btnText.includes('manage businesses')) return true;
        return false;
    });
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Refresh business list when switching to manage tab
    if (tabName === 'manage-businesses') {
        populateBusinessList();
    }
}

// Populate categories grid
function populateCategories() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    categoriesData.slice(0, 6).forEach(category => {
        const categoryCard = createCategoryCard(category);
        grid.appendChild(categoryCard);
    });
}

// Populate all categories
function populateAllCategories() {
    const grid = document.getElementById('all-categories-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    categoriesData.forEach(category => {
        const categoryCard = createCategoryCard(category);
        grid.appendChild(categoryCard);
    });
}

// Create category card
function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.onclick = () => searchByCategory(category.name);
    
    card.innerHTML = `
        <div class="category-icon">${category.icon}</div>
        <div class="category-name">${category.name}</div>
        <div class="category-count">${category.count} businesses</div>
    `;
    
    return card;
}

// Populate featured businesses
function populateFeaturedBusinesses() {
    const grid = document.getElementById('featured-businesses');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const featuredBusinesses = businessesData.filter(business => business.featured);
    
    featuredBusinesses.forEach(business => {
        const businessCard = createBusinessCard(business);
        grid.appendChild(businessCard);
    });
}

// Create business card - Fixed with proper onclick handlers
function createBusinessCard(business) {
    const card = document.createElement('div');
    card.className = 'business-card';
    
    const stars = '★'.repeat(Math.floor(business.rating)) + '☆'.repeat(5 - Math.floor(business.rating));
    
    card.innerHTML = `
        <div class="business-header">
            <div class="business-logo">${business.logo}</div>
            <div class="business-info">
                <h3>${business.name}</h3>
                <div class="business-category">${business.category}</div>
            </div>
        </div>
        <div class="business-body">
            <div class="business-description">${business.description.substring(0, 120)}${business.description.length > 120 ? '...' : ''}</div>
            <div class="business-meta">
                <div class="business-rating">
                    <span class="rating-stars">${stars}</span>
                    <span class="rating-number">${business.rating}</span>
                </div>
                ${business.featured ? '<span class="featured-badge">Featured</span>' : ''}
            </div>
            <div class="business-actions">
                <button class="btn btn--primary btn-sm" onclick="showBusinessDetails(${business.id})">View Details</button>
                <button class="btn btn--secondary btn-sm" onclick="openContactModal(${business.id})">Contact</button>
            </div>
        </div>
    `;
    
    return card;
}

// Search functionality - Fixed
function performSearch() {
    const keywords = document.getElementById('main-search').value;
    const location = document.getElementById('location-search').value;
    
    console.log('Performing search:', keywords, location);
    
    // Switch to search section and perform search
    showSection('search');
    document.getElementById('search-keywords').value = keywords;
    document.getElementById('search-location').value = location;
    performAdvancedSearch();
}

function performAdvancedSearch() {
    const keywords = document.getElementById('search-keywords').value.toLowerCase();
    const category = document.getElementById('search-category').value;
    const location = document.getElementById('search-location').value.toLowerCase();
    const sortBy = document.getElementById('search-sort').value;
    
    console.log('Advanced search:', { keywords, category, location, sortBy });
    
    let results = businessesData.filter(business => {
        const matchesKeywords = !keywords || 
            business.name.toLowerCase().includes(keywords) ||
            business.description.toLowerCase().includes(keywords) ||
            business.industry.toLowerCase().includes(keywords) ||
            business.products.some(product => product.toLowerCase().includes(keywords));
        
        const matchesCategory = !category || business.category === category;
        
        const matchesLocation = !location ||
            business.address.toLowerCase().includes(location);
        
        return matchesKeywords && matchesCategory && matchesLocation;
    });
    
    // Sort results
    results.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'rating':
                return b.rating - a.rating;
            case 'newest':
                return b.id - a.id;
            default:
                return 0;
        }
    });
    
    displaySearchResults(results);
}

function searchByCategory(categoryName) {
    console.log('Searching by category:', categoryName);
    showSection('search');
    document.getElementById('search-category').value = categoryName;
    document.getElementById('search-keywords').value = '';
    document.getElementById('search-location').value = '';
    performAdvancedSearch();
}

function displaySearchResults(results) {
    const resultsGrid = document.getElementById('results-grid');
    const resultsCount = document.getElementById('results-count');
    
    if (!resultsGrid || !resultsCount) return;
    
    resultsCount.textContent = `${results.length} business${results.length !== 1 ? 'es' : ''} found`;
    
    if (results.length === 0) {
        resultsGrid.innerHTML = `
            <div class="empty-state">
                <h3>No businesses found</h3>
                <p>Try adjusting your search criteria or browse by category.</p>
            </div>
        `;
        return;
    }
    
    resultsGrid.innerHTML = '';
    results.forEach(business => {
        const businessCard = createBusinessCard(business);
        resultsGrid.appendChild(businessCard);
    });
}

// Populate search categories dropdown
function populateSearchCategories() {
    const select = document.getElementById('search-category');
    if (!select) return;
    
    select.innerHTML = '<option value="">All Categories</option>';
    
    categoriesData.forEach(category => {
        if (category.count > 0) {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            select.appendChild(option);
        }
    });
}

// Modal functionality - Fixed
function showBusinessDetails(businessId) {
    console.log('Showing business details for ID:', businessId);
    
    const business = businessesData.find(b => b.id === businessId);
    if (!business) {
        console.error('Business not found:', businessId);
        return;
    }
    
    const modal = document.getElementById('business-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalTitle || !modalBody) {
        console.error('Modal elements not found');
        return;
    }
    
    modalTitle.textContent = business.name;
    
    const stars = '★'.repeat(Math.floor(business.rating)) + '☆'.repeat(5 - Math.floor(business.rating));
    
    modalBody.innerHTML = `
        <div class="business-detail">
            <div class="business-detail-header">
                <div class="business-detail-logo">${business.logo}</div>
                <div class="business-detail-info">
                    <h2>${business.name}</h2>
                    <div class="business-detail-category">${business.category} • ${business.industry}</div>
                    <div class="business-rating">
                        <span class="rating-stars">${stars}</span>
                        <span class="rating-number">${business.rating}/5</span>
                    </div>
                </div>
            </div>
            
            <div class="business-detail-section">
                <h4>Description</h4>
                <p>${business.description}</p>
            </div>
            
            <div class="business-detail-section">
                <h4>Contact Information</h4>
                <div class="contact-info">
                    ${business.phone ? `<div class="contact-item"><span class="contact-icon">📞</span> ${business.phone}</div>` : ''}
                    ${business.email ? `<div class="contact-item"><span class="contact-icon">✉️</span> ${business.email}</div>` : ''}
                    ${business.website ? `<div class="contact-item"><span class="contact-icon">🌐</span> <a href="https://${business.website}" target="_blank">${business.website}</a></div>` : ''}
                    ${business.address ? `<div class="contact-item"><span class="contact-icon">📍</span> ${business.address}</div>` : ''}
                </div>
            </div>
            
            ${business.products && business.products.length > 0 ? `
                <div class="business-detail-section">
                    <h4>Products & Services</h4>
                    <div class="products-list">
                        ${business.products.map(product => `<span class="product-tag">${product}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${business.hours ? `
                <div class="business-detail-section">
                    <h4>Business Hours</h4>
                    <p>${business.hours}</p>
                </div>
            ` : ''}
            
            <div class="business-actions-modal">
                <button class="btn btn--primary" onclick="openContactModal(${business.id})">Contact Business</button>
                ${business.website ? `<a href="https://${business.website}" target="_blank" class="btn btn--secondary">Visit Website</a>` : ''}
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    console.log('Business modal opened');
}

function closeModal() {
    const modal = document.getElementById('business-modal');
    if (modal) {
        modal.classList.add('hidden');
        console.log('Business modal closed');
    }
}

function openContactModal(businessId) {
    console.log('Opening contact modal for business ID:', businessId);
    
    currentContactBusinessId = businessId;
    const business = businessesData.find(b => b.id === businessId);
    
    if (business) {
        const contactModal = document.getElementById('contact-modal');
        if (contactModal) {
            contactModal.classList.remove('hidden');
            document.querySelector('#contact-modal .modal-header h3').textContent = `Contact ${business.name}`;
            console.log('Contact modal opened');
        }
    }
}

function closeContactModal() {
    const contactModal = document.getElementById('contact-modal');
    if (contactModal) {
        contactModal.classList.add('hidden');
        currentContactBusinessId = null;
        document.getElementById('contact-form').reset();
        console.log('Contact modal closed');
    }
}

function handleContactSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        businessId: currentContactBusinessId,
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    console.log('Contact form submitted:', contactData);
    
    // In a real application, this would send the data to a server
    alert('Thank you for your message! The business will be notified and should respond within 24-48 hours.');
    
    closeContactModal();
}

// Admin functionality
function populateAdminStats() {
    const totalBusinesses = businessesData.length;
    const totalCategories = categoriesData.filter(cat => cat.count > 0).length;
    const featuredCount = businessesData.filter(b => b.featured).length;
    
    const adminStatBusinesses = document.getElementById('admin-stat-businesses');
    const adminStatCategories = document.getElementById('admin-stat-categories');
    const adminStatFeatured = document.getElementById('admin-stat-featured');
    
    if (adminStatBusinesses) adminStatBusinesses.textContent = totalBusinesses;
    if (adminStatCategories) adminStatCategories.textContent = totalCategories;
    if (adminStatFeatured) adminStatFeatured.textContent = featuredCount;
}

function populateBusinessList() {
    const businessList = document.getElementById('business-list');
    if (!businessList) return;
    
    businessList.innerHTML = '';
    
    if (businessesData.length === 0) {
        businessList.innerHTML = `
            <div class="empty-state">
                <h3>No businesses listed</h3>
                <p>Add your first business listing using the "Add Business" tab.</p>
            </div>
        `;
        return;
    }
    
    businessesData.forEach(business => {
        const businessItem = document.createElement('div');
        businessItem.className = 'business-item';
        
        businessItem.innerHTML = `
            <div class="business-item-info">
                <h4>${business.name}</h4>
                <div class="business-item-meta">
                    ${business.category} • ${business.rating}★ ${business.featured ? '• Featured' : ''}
                </div>
            </div>
            <div class="business-item-actions">
                <button class="btn btn--secondary btn-sm" onclick="editBusiness(${business.id})">Edit</button>
                <button class="btn btn--outline btn-sm" onclick="deleteBusiness(${business.id})">Delete</button>
            </div>
        `;
        
        businessList.appendChild(businessItem);
    });
}

function handleAddBusiness(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const productsString = formData.get('products') || '';
    const products = productsString.split(',').map(p => p.trim()).filter(p => p);
    
    const newBusiness = {
        id: nextBusinessId++,
        name: formData.get('name'),
        category: formData.get('category'),
        industry: formData.get('industry'),
        description: formData.get('description'),
        phone: formData.get('phone') || '',
        email: formData.get('email') || '',
        website: formData.get('website') || '',
        address: formData.get('address') || '',
        products: products,
        hours: formData.get('hours') || '',
        logo: formData.get('logo') || '🏢',
        featured: formData.get('featured') === 'on',
        rating: 4.0 + Math.random() // Random rating between 4.0-5.0
    };
    
    businessesData.push(newBusiness);
    updateCategoryCounts();
    saveData();
    
    // Refresh UI
    populateCategories();
    populateAllCategories();
    populateFeaturedBusinesses();
    populateSearchCategories();
    populateAdminStats();
    populateBusinessList();
    updateStats();
    
    // Show success message and reset form
    alert('Business added successfully!');
    e.target.reset();
    
    // Switch to manage tab
    showAdminTab('manage-businesses');
}

function editBusiness(businessId) {
    const business = businessesData.find(b => b.id === businessId);
    if (!business) return;
    
    // Switch to add business tab and populate form
    showAdminTab('add-business');
    
    const form = document.getElementById('add-business-form');
    if (!form) return;
    
    form.name.value = business.name;
    form.category.value = business.category;
    form.industry.value = business.industry;
    form.description.value = business.description;
    form.phone.value = business.phone;
    form.email.value = business.email;
    form.website.value = business.website;
    form.address.value = business.address;
    form.products.value = business.products.join(', ');
    form.hours.value = business.hours;
    form.logo.value = business.logo;
    form.featured.checked = business.featured;
    
    // Change form submission to edit mode
    form.onsubmit = function(e) {
        e.preventDefault();
        updateBusiness(businessId, e);
    };
    
    // Change button text
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Update Business';
    }
}

function updateBusiness(businessId, e) {
    const formData = new FormData(e.target);
    const productsString = formData.get('products') || '';
    const products = productsString.split(',').map(p => p.trim()).filter(p => p);
    
    const businessIndex = businessesData.findIndex(b => b.id === businessId);
    if (businessIndex === -1) return;
    
    // Update business data
    businessesData[businessIndex] = {
        ...businessesData[businessIndex],
        name: formData.get('name'),
        category: formData.get('category'),
        industry: formData.get('industry'),
        description: formData.get('description'),
        phone: formData.get('phone') || '',
        email: formData.get('email') || '',
        website: formData.get('website') || '',
        address: formData.get('address') || '',
        products: products,
        hours: formData.get('hours') || '',
        logo: formData.get('logo') || '🏢',
        featured: formData.get('featured') === 'on'
    };
    
    updateCategoryCounts();
    saveData();
    
    // Refresh UI
    populateCategories();
    populateAllCategories();
    populateFeaturedBusinesses();
    populateSearchCategories();
    populateAdminStats();
    populateBusinessList();
    updateStats();
    
    // Reset form to add mode
    e.target.reset();
    e.target.onsubmit = handleAddBusiness;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = 'Add Business';
    }
    
    alert('Business updated successfully!');
    showAdminTab('manage-businesses');
}

function deleteBusiness(businessId) {
    if (!confirm('Are you sure you want to delete this business? This action cannot be undone.')) {
        return;
    }
    
    const businessIndex = businessesData.findIndex(b => b.id === businessId);
    if (businessIndex === -1) return;
    
    businessesData.splice(businessIndex, 1);
    updateCategoryCounts();
    saveData();
    
    // Refresh UI
    populateCategories();
    populateAllCategories();
    populateFeaturedBusinesses();
    populateSearchCategories();
    populateAdminStats();
    populateBusinessList();
    updateStats();
    
    alert('Business deleted successfully!');
}

// Update stats on homepage
function updateStats() {
    const stats = {
        totalBusinesses: businessesData.length,
        totalCategories: categoriesData.filter(cat => cat.count > 0).length,
        totalUsers: 150 + businessesData.length * 5, // Simulated user growth
        totalLocations: Math.max(12, Math.ceil(businessesData.length * 1.5)) // Simulated location growth
    };
    
    const statBusinesses = document.getElementById('stat-businesses');
    const statCategories = document.getElementById('stat-categories');
    const statLocations = document.getElementById('stat-locations');
    const statUsers = document.getElementById('stat-users');
    
    if (statBusinesses) statBusinesses.textContent = stats.totalBusinesses;
    if (statCategories) statCategories.textContent = stats.totalCategories;
    if (statLocations) statLocations.textContent = stats.totalLocations;
    if (statUsers) statUsers.textContent = stats.totalUsers + '+';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const businessModal = document.getElementById('business-modal');
    const contactModal = document.getElementById('contact-modal');
    
    if (event.target === businessModal) {
        closeModal();
    }
    
    if (event.target === contactModal) {
        closeContactModal();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeContactModal();
    }
});

console.log('Community Business Directory loaded successfully!');
console.log('Total businesses:', businessesData.length);
console.log('Features: Search, Categories, Admin Panel, Contact Forms, Legal Disclaimers');