// Sample car data (prices in FCFA)
let cars = [
    {
        id: 1,
        make: 'Toyota',
        model: 'Camry',
        year: 2022,
        price: 15000000,
        type: 'sell',
        mileage: 15000,
        description: 'Well-maintained sedan with excellent fuel economy.',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800'
    },
    {
        id: 2,
        make: 'BMW',
        model: '3 Series',
        year: 2023,
        price: 90000,
        type: 'rent',
        mileage: 8000,
        description: 'Luxury sedan perfect for special occasions.',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
    },
    {
        id: 3,
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        price: 10800000,
        type: 'sell',
        mileage: 25000,
        description: 'Reliable compact car with modern features.',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
    },
    {
        id: 4,
        make: 'Mercedes',
        model: 'C-Class',
        year: 2023,
        price: 120000,
        type: 'rent',
        mileage: 5000,
        description: 'Premium luxury vehicle with all amenities.',
        image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'
    },
    {
        id: 5,
        make: 'Audi',
        model: 'A4',
        year: 2022,
        price: 19200000,
        type: 'sell',
        mileage: 12000,
        description: 'Sophisticated German engineering at its best.',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
    },
    {
        id: 6,
        make: 'Ford',
        model: 'Mustang',
        year: 2023,
        price: 108000,
        type: 'rent',
        mileage: 3000,
        description: 'Sporty and powerful, perfect for a weekend getaway.',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const carsGrid = document.getElementById('carsGrid');
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const priceFilter = document.getElementById('priceFilter');
    const makeFilter = document.getElementById('makeFilter');
    const rentForm = document.getElementById('rentForm');
    const buyForm = document.getElementById('buyForm');
    const sellForm = document.getElementById('sellForm');
    const rentCarSelect = document.getElementById('rentCarSelect');
    const buyCarSelect = document.getElementById('buyCarSelect');
    const carModal = document.getElementById('carModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close');
    const notification = document.getElementById('notification');

    // Mobile Navigation Toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    if (navLinks && hamburger && navMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect and Active Nav Link on Scroll
    window.addEventListener('scroll', () => {
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Active nav link based on scroll position
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        if (navLinks) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Display Cars
    function displayCars(carsToShow = cars) {
        if (!carsGrid) return;
        
        if (carsToShow.length === 0) {
            carsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 2rem; color: var(--beige);">No cars found matching your criteria.</p>';
            return;
        }

        carsGrid.innerHTML = carsToShow.map(car => `
            <div class="car-card" data-car-id="${car.id}">
                <div style="position: relative;">
                    <img src="${car.image}" alt="${car.make} ${car.model}" class="car-image" onerror="this.src='https://via.placeholder.com/400x200?text=${car.make}+${car.model}'">
                    <span class="car-badge ${car.type === 'rent' ? 'badge-rent' : 'badge-sell'}">
                        ${car.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                </div>
                <div class="car-info">
                    <div class="car-header">
                        <div>
                            <div class="car-title">${car.make} ${car.model}</div>
                            <div class="car-year">${car.year}</div>
                        </div>
                    </div>
                    <div class="car-price">
                        ${car.price.toLocaleString()} FCFA${car.type === 'rent' ? '/day' : ''}
                    </div>
                    <div class="car-details">
                        <div class="car-detail-item">
                            <i class="fas fa-road"></i>
                            <span>${car.mileage.toLocaleString()} mi</span>
                        </div>
                        <div class="car-detail-item">
                            <i class="fas fa-car"></i>
                            <span>${car.type === 'rent' ? 'Rental' : 'Sale'}</span>
                        </div>
                    </div>
                    <p class="car-description">${car.description}</p>
                    <div class="car-actions">
                        <button class="btn btn-primary btn-small view-details" data-car-id="${car.id}">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const carId = parseInt(btn.getAttribute('data-car-id'));
                showCarDetails(carId);
            });
        });
    }

    // Show Car Details Modal
    function showCarDetails(carId) {
        const car = cars.find(c => c.id === carId);
        if (!car || !modalBody || !carModal) return;

        modalBody.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <img src="${car.image}" alt="${car.make} ${car.model}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;" onerror="this.src='https://via.placeholder.com/400x200?text=${car.make}+${car.model}'">
                    <div class="car-badge ${car.type === 'rent' ? 'badge-rent' : 'badge-sell'}" style="display: inline-block;">
                        ${car.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </div>
                </div>
                <div>
                    <h2 style="margin-bottom: 0.5rem; color: var(--brown);">${car.make} ${car.model}</h2>
                    <p style="color: rgba(107, 62, 38, 0.7); margin-bottom: 1rem;">${car.year}</p>
                    <div style="font-size: 2rem; font-weight: bold; color: var(--brown); margin-bottom: 1rem;">
                        ${car.price.toLocaleString()} FCFA${car.type === 'rent' ? '/day' : ''}
                    </div>
                    <div style="margin-bottom: 1rem; color: var(--brown);">
                        <strong>Mileage:</strong> ${car.mileage.toLocaleString()} miles
                    </div>
                    <div style="margin-bottom: 1rem; color: var(--brown);">
                        <strong>Description:</strong>
                        <p style="margin-top: 0.5rem; color: rgba(107, 62, 38, 0.8);">${car.description}</p>
                    </div>
                    ${car.type === 'rent' ? `
                        <a href="#rent" class="btn btn-primary" onclick="document.getElementById('carModal').style.display='none'; document.getElementById('rentCarSelect').value='${car.id}'">
                            Rent This Car
                        </a>
                    ` : `
                        <a href="#buy" class="btn btn-primary" onclick="document.getElementById('carModal').style.display='none'; document.getElementById('buyCarSelect').value='${car.id}'">
                            Buy This Car
                        </a>
                    `}
                </div>
            </div>
        `;

        // Responsive modal content
        if (window.innerWidth <= 768) {
            modalBody.innerHTML = `
                <div>
                    <img src="${car.image}" alt="${car.make} ${car.model}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;" onerror="this.src='https://via.placeholder.com/400x200?text=${car.make}+${car.model}'">
                    <div class="car-badge ${car.type === 'rent' ? 'badge-rent' : 'badge-sell'}" style="display: inline-block; margin-bottom: 1rem;">
                        ${car.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </div>
                    <h2 style="margin-bottom: 0.5rem; color: var(--brown);">${car.make} ${car.model}</h2>
                    <p style="color: rgba(107, 62, 38, 0.7); margin-bottom: 1rem;">${car.year}</p>
                    <div style="font-size: 2rem; font-weight: bold; color: var(--brown); margin-bottom: 1rem;">
                        ${car.price.toLocaleString()} FCFA${car.type === 'rent' ? '/day' : ''}
                    </div>
                    <div style="margin-bottom: 1rem; color: var(--brown);">
                        <strong>Mileage:</strong> ${car.mileage.toLocaleString()} miles
                    </div>
                    <div style="margin-bottom: 1rem; color: var(--brown);">
                        <strong>Description:</strong>
                        <p style="margin-top: 0.5rem; color: rgba(107, 62, 38, 0.8);">${car.description}</p>
                    </div>
                    ${car.type === 'rent' ? `
                        <a href="#rent" class="btn btn-primary" style="width: 100%; text-align: center; display: block;" onclick="document.getElementById('carModal').style.display='none'; document.getElementById('rentCarSelect').value='${car.id}'">
                            Rent This Car
                        </a>
                    ` : `
                        <a href="#buy" class="btn btn-primary" style="width: 100%; text-align: center; display: block;" onclick="document.getElementById('carModal').style.display='none'; document.getElementById('buyCarSelect').value='${car.id}'">
                            Buy This Car
                        </a>
                    `}
                </div>
            `;
        }

        carModal.style.display = 'flex';
    }

    // Close Modal
    if (closeModal && carModal) {
        closeModal.addEventListener('click', () => {
            carModal.style.display = 'none';
        });
    }

    if (carModal) {
        window.addEventListener('click', (e) => {
            if (e.target === carModal) {
                carModal.style.display = 'none';
            }
        });
    }

    // Filter and Search Cars
    function filterCars() {
        if (!searchInput || !typeFilter || !priceFilter || !makeFilter) return;
        
        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;
        const selectedPrice = priceFilter.value;
        const selectedMake = makeFilter.value;

        let filteredCars = cars.filter(car => {
            const matchesSearch = car.make.toLowerCase().includes(searchTerm) ||
                                car.model.toLowerCase().includes(searchTerm) ||
                                car.type.toLowerCase().includes(searchTerm);
            
            const matchesType = selectedType === 'all' || car.type === selectedType;
            
            const matchesMake = selectedMake === 'all' || car.make === selectedMake;
            
            let matchesPrice = true;
            if (selectedPrice !== 'all') {
                const [min, max] = selectedPrice.split('-').map(v => v.replace('+', ''));
                if (max) {
                    matchesPrice = car.price >= parseInt(min) && car.price <= parseInt(max);
                } else {
                    matchesPrice = car.price >= parseInt(min);
                }
            }
            
            return matchesSearch && matchesType && matchesMake && matchesPrice;
        });

        displayCars(filteredCars);
    }

    // Event Listeners for Filters
    if (searchInput) {
        searchInput.addEventListener('input', filterCars);
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', filterCars);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterCars);
    }
    if (makeFilter) {
        makeFilter.addEventListener('change', filterCars);
    }

    // Populate Rent Car Select
    function populateRentCarSelect() {
        if (!rentCarSelect) return;
        const rentCars = cars.filter(car => car.type === 'rent');
        rentCarSelect.innerHTML = '<option value="">Choose a car...</option>' +
            rentCars.map(car => 
                `<option value="${car.id}">${car.make} ${car.model} ${car.year} - ${car.price.toLocaleString()} FCFA/day</option>`
            ).join('');
    }

    // Populate Buy Car Select
    function populateBuyCarSelect() {
        if (!buyCarSelect) return;
        const sellCars = cars.filter(car => car.type === 'sell');
        buyCarSelect.innerHTML = '<option value="">Choose a car...</option>' +
            sellCars.map(car => 
                `<option value="${car.id}">${car.make} ${car.model} ${car.year} - ${car.price.toLocaleString()} FCFA</option>`
            ).join('');
    }

    // Rent Form Submission
    if (rentForm) {
        rentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                carId: rentCarSelect ? rentCarSelect.value : '',
                name: document.getElementById('rentName') ? document.getElementById('rentName').value : '',
                email: document.getElementById('rentEmail') ? document.getElementById('rentEmail').value : '',
                phone: document.getElementById('rentPhone') ? document.getElementById('rentPhone').value : '',
                duration: document.getElementById('rentDuration') ? document.getElementById('rentDuration').value : '',
                date: document.getElementById('rentDate') ? document.getElementById('rentDate').value : ''
            };

            if (!formData.carId) {
                showNotification('Please select a car to rent.', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Rental request submitted successfully! We will contact you soon.', 'success');
            rentForm.reset();
            
            // In a real application, you would send this data to a server
            console.log('Rental Request:', formData);
        });
    }

    // Buy Form Submission
    if (buyForm) {
        buyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                carId: buyCarSelect ? buyCarSelect.value : '',
                name: document.getElementById('buyName') ? document.getElementById('buyName').value : '',
                email: document.getElementById('buyEmail') ? document.getElementById('buyEmail').value : '',
                phone: document.getElementById('buyPhone') ? document.getElementById('buyPhone').value : '',
                address: document.getElementById('buyAddress') ? document.getElementById('buyAddress').value : '',
                message: document.getElementById('buyMessage') ? document.getElementById('buyMessage').value : ''
            };

            if (!formData.carId) {
                showNotification('Please select a car to buy.', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Purchase request submitted successfully! We will contact you soon.', 'success');
            buyForm.reset();
            
            // In a real application, you would send this data to a server
            console.log('Purchase Request:', formData);
        });
    }

    // Sell Form Submission
    if (sellForm) {
        sellForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newCar = {
                id: cars.length + 1,
                make: document.getElementById('sellMake') ? document.getElementById('sellMake').value : '',
                model: document.getElementById('sellModel') ? document.getElementById('sellModel').value : '',
                year: document.getElementById('sellYear') ? parseInt(document.getElementById('sellYear').value) : 2024,
                price: document.getElementById('sellPrice') ? parseFloat(document.getElementById('sellPrice').value) : 0,
                mileage: document.getElementById('sellMileage') ? parseInt(document.getElementById('sellMileage').value) : 0,
                type: document.getElementById('sellType') ? document.getElementById('sellType').value : 'sell',
                image: document.getElementById('sellImage') ? (document.getElementById('sellImage').value || 'https://via.placeholder.com/400x200?text=Car+Image') : 'https://via.placeholder.com/400x200?text=Car+Image',
                description: document.getElementById('sellDescription') ? document.getElementById('sellDescription').value : ''
            };

            cars.push(newCar);
            displayCars(cars);
            populateRentCarSelect();
            populateBuyCarSelect();
            
            showNotification('Your car has been listed successfully!', 'success');
            sellForm.reset();
            
            // In a real application, you would send this data to a server
            console.log('New Car Listing:', newCar);
            
            // Scroll to cars section
            const carsSection = document.getElementById('cars');
            if (carsSection) {
                carsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Show Notification
    function showNotification(message, type = 'success') {
        if (!notification) return;
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // Set minimum date for rental date picker
    const rentDateInput = document.getElementById('rentDate');
    if (rentDateInput) {
        const today = new Date().toISOString().split('T')[0];
        rentDateInput.setAttribute('min', today);
    }

    // Initialize
    displayCars();
    populateRentCarSelect();
    populateBuyCarSelect();
});
