document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000'; // Base URL for your server

    // Tab navigation elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Add Product form elements
    const categorySelect = document.getElementById('cid');
    const brandSelect = document.getElementById('bid');
    const storeSelect = document.getElementById('sid');
    const addProductForm = document.getElementById('addProductForm');
    const messageDiv = document.getElementById('message');

    // Show Info elements
    const refreshBtn = document.getElementById('refreshBtn');
    const clearFilters = document.getElementById('clearFilters');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const productsBody = document.getElementById('productsBody');
    const loadingMessage = document.getElementById('loadingMessage');
    const productsTable = document.getElementById('productsTable');

    // Function to populate select dropdown
    const populateSelect = (selectElement, items, valueField, nameField) => {
        // Clear existing options except the first one
        selectElement.innerHTML = '<option value="">-- Select an Option --</option>';
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueField];
            option.textContent = item[nameField];
            selectElement.appendChild(option);
        });
    };

    // Function to load all dropdowns
    const loadDropdowns = async () => {
        try {
            // Load categories
            const categoriesResponse = await fetch(`${API_URL}/api/categories`);
            const categoriesData = await categoriesResponse.json();
            populateSelect(categorySelect, categoriesData, 'cid', 'category_name');

            // Load brands
            const brandsResponse = await fetch(`${API_URL}/api/brands`);
            const brandsData = await brandsResponse.json();
            populateSelect(brandSelect, brandsData, 'bid', 'bname');

            // Load stores
            const storesResponse = await fetch(`${API_URL}/api/stores`);
            const storesData = await storesResponse.json();
            populateSelect(storeSelect, storesData, 'sid', 'sname');

        } catch (error) {
            console.error('Error loading dropdown data:', error);
            messageDiv.textContent = 'Error connecting to server. Please ensure the server is running.';
            messageDiv.className = 'error';
        }
    };

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Load data when switching to specific tabs
            if (targetTab === 'add-product') {
                loadDropdowns();
            } else if (targetTab === 'show-info') {
                loadProducts();
                loadFilterDropdowns();
            }
        });
    });

    // Load dropdowns when page loads
    loadDropdowns();
        
    // Handle form submission
    addProductForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Disable button and show loading
        const submitButton = addProductForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading"></span> Adding...';

        try {
            const formData = new FormData(addProductForm);
            const productData = Object.fromEntries(formData.entries());

            // Convert numeric fields to numbers
            productData.p_stock = parseInt(productData.p_stock);
            productData.price = parseFloat(productData.price);
            productData.cid = parseInt(productData.cid);
            productData.bid = parseInt(productData.bid);
            productData.sid = parseInt(productData.sid);

            const response = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const data = await response.json();

            if (data.productId) {
                messageDiv.textContent = 'Product added successfully!';
                messageDiv.className = 'success';
                addProductForm.reset();
                
                // Reset dropdowns
                categorySelect.innerHTML = '<option value="">-- Select Category --</option>';
                brandSelect.innerHTML = '<option value="">-- Select Brand --</option>';
                storeSelect.innerHTML = '<option value="">-- Select Store --</option>';
                
                // Reload dropdowns
                setTimeout(() => {
                    loadDropdowns();
                }, 500);

            } else {
                throw new Error(data.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            messageDiv.textContent = `Error: ${error.message}`;
            messageDiv.className = 'error';
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

    // Form validation
    const inputs = addProductForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                input.style.backgroundColor = '#fadbd8';
            } else {
                input.style.borderColor = '#e0e6ed';
                input.style.backgroundColor = '#f8f9fa';
            }
        });

        input.addEventListener('input', () => {
            if (input.style.borderColor === 'rgb(231, 76, 60)') {
                input.style.borderColor = '#e0e6ed';
                input.style.backgroundColor = '#f8f9fa';
            }
        });
    });

    // Show Info functionality
    let allProducts = [];

    // Load products from server
    const loadProducts = async () => {
        try {
            loadingMessage.style.display = 'block';
            productsTable.style.display = 'none';
            
            const response = await fetch(`${API_URL}/api/products`);
            const data = await response.json();
            
            allProducts = data;
            displayProducts(data);
            
            loadingMessage.style.display = 'none';
            productsTable.style.display = 'block';
        } catch (error) {
            console.error('Error loading products:', error);
            loadingMessage.innerHTML = 'Error loading products. Please try again.';
            loadingMessage.className = 'error';
        }
    };

    // Load filter dropdowns
    const loadFilterDropdowns = async () => {
        try {
            // Load categories for filter
            const categoriesResponse = await fetch(`${API_URL}/api/categories`);
            const categoriesData = await categoriesResponse.json();
            
            categoryFilter.innerHTML = '<option value="">All Categories</option>';
            categoriesData.forEach(category => {
                const option = document.createElement('option');
                option.value = category.category_name;
                option.textContent = category.category_name;
                categoryFilter.appendChild(option);
            });

            // Load brands for filter
            const brandsResponse = await fetch(`${API_URL}/api/brands`);
            const brandsData = await brandsResponse.json();
            
            brandFilter.innerHTML = '<option value="">All Brands</option>';
            brandsData.forEach(brand => {
                const option = document.createElement('option');
                option.value = brand.bname;
                option.textContent = brand.bname;
                brandFilter.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading filter data:', error);
        }
    };

    // Display products in table
    const displayProducts = (products) => {
        productsBody.innerHTML = '';
        
        if (products.length === 0) {
            productsBody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem; color: #6c757d;">No products found</td></tr>';
            return;
        }

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.pid}</td>
                <td>${product.pname}</td>
                <td>${product.p_stock}</td>
                <td>$${parseFloat(product.price).toFixed(2)}</td>
                <td>${product.category_name}</td>
                <td>${product.bname}</td>
                <td>${product.sname}</td>
                <td>${new Date(product.added_date).toLocaleDateString()}</td>
            `;
            productsBody.appendChild(row);
        });
    };

    // Filter products
    const filterProducts = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedBrand = brandFilter.value;

        const filteredProducts = allProducts.filter(product => {
            const matchesSearch = product.pname.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || product.category_name === selectedCategory;
            const matchesBrand = !selectedBrand || product.bname === selectedBrand;
            
            return matchesSearch && matchesCategory && matchesBrand;
        });

        displayProducts(filteredProducts);
    };

    // Event listeners for Show Info section
    refreshBtn.addEventListener('click', loadProducts);
    clearFilters.addEventListener('click', () => {
        searchInput.value = '';
        categoryFilter.value = '';
        brandFilter.value = '';
        filterProducts();
    });
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    brandFilter.addEventListener('change', filterProducts);
});
