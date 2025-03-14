/**
 * Profile Card Interactive Features
 * Enhances the profile card with animations, interactions, and dynamic content
 * Works in conjunction with the HTML structure and CSS styling
 */

document.addEventListener('DOMContentLoaded', function () {
    // ===== ELEMENT SELECTION =====
    // Get all the elements we need to interact with
    const profileCard = document.getElementById('profile-card');
    const viewMoreBtn = document.getElementById('view-more-btn');
    const contactBtn = document.getElementById('contact-btn');
    const expandedContent = document.getElementById('expanded-content');
    const socialIcons = document.querySelectorAll('.social-icon');
    const profileImage = document.querySelector('.images');

    // ===== INITIALIZATION =====
    // Set up initial state and animations
    initializeCard();

    // ===== EVENT LISTENERS =====
    // Add all event listeners for interactive elements
    setupEventListeners();

    // ===== FUNCTIONS =====

    /**
     * Sets up the initial state of the card with animations
     */
    function initializeCard() {
        // Add a class to the body when everything is loaded
        document.body.classList.add('loaded');

        // Animate profile image on load
        setTimeout(() => {
            profileImage.classList.add('animate-in');
        }, 300);

        // Stagger the appearance of social icons
        socialIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.classList.add('animate-in');
            }, 500 + (index * 100));
        });

        // Add CSS variables for theme customization
        document.documentElement.style.setProperty('--profile-hue', Math.floor(Math.random() * 360));

        // Initialize skill bars with zero width (for animation later)
        document.querySelectorAll('.skill-level').forEach(skill => {
            const targetWidth = skill.style.width;
            skill.style.width = '0%';
            skill.dataset.targetWidth = targetWidth;
        });
    }

    /**
     * Sets up all event listeners for interactive elements
     */
    function setupEventListeners() {
        // Toggle expanded content when "View More" is clicked
        viewMoreBtn.addEventListener('click', toggleExpandedContent);

        // Show contact form when "Contact Me" is clicked
        contactBtn.addEventListener('click', showContactForm);

        // Add hover effects for social icons
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateY(-5px) rotate(5deg)';
            });

            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0) rotate(0)';
            });
        });

        // Add theme toggle functionality
        createThemeToggle();

        // Add download resume button
        createDownloadButton();
    }

    /**
     * Toggles the expanded content section
     */
    function toggleExpandedContent() {
        // Toggle the active class
        expandedContent.classList.toggle('active');

        if (expandedContent.classList.contains('active')) {
            // Change button text
            viewMoreBtn.textContent = 'View Less';

            // Animate skill bars
            setTimeout(() => {
                document.querySelectorAll('.skill-level').forEach(skill => {
                    skill.style.width = skill.dataset.targetWidth;
                });
            }, 300);

            // Scroll to show expanded content
            setTimeout(() => {
                expandedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            // Change button text back
            viewMoreBtn.textContent = 'View More';

            // Reset skill bars for next animation
            setTimeout(() => {
                document.querySelectorAll('.skill-level').forEach(skill => {
                    skill.style.width = '0%';
                });
            }, 500);
        }
    }

    /**
     * Creates and displays the contact form modal
     */
    function showContactForm() {
        // Create modal container
        const modal = document.createElement('div');
        modal.className = 'contact-modal';

        // Create modal content
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Contact Me</h2>
                <form id="contact-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <select id="subject" name="subject" required>
                            <option value="">Select a subject</option>
                            <option value="job">Job Opportunity</option>
                            <option value="project">Project Collaboration</option>
                            <option value="question">General Question</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Send Message</button>
                </form>
            </div>
        `;

        // Add modal to the DOM
        document.body.appendChild(modal);

        // Add modal styles if not already added
        if (!document.getElementById('modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                .contact-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .modal-content {
                    background-color: white;
                    padding: 30px;
                    border-radius: 15px;
                    width: 90%;
                    max-width: 500px;
                    position: relative;
                    transform: translateY(20px);
                    transition: transform 0.3s ease;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }
                
                .close-modal {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 24px;
                    cursor: pointer;
                    color: #333;
                    transition: color 0.2s;
                }
                
                .close-modal:hover {
                    color: var(--primary-color);
                }
                
                .form-group {
                    margin-bottom: 20px;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 500;
                    color: #333;
                }
                
                .form-group input,
                .form-group textarea,
                .form-group select {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-family: 'Poppins', sans-serif;
                    transition: border-color 0.3s;
                }
                
                .form-group input:focus,
                .form-group textarea:focus,
                .form-group select:focus {
                    border-color: var(--primary-color);
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(0, 159, 175, 0.2);
                }
                
                .submit-btn {
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: background-color 0.3s, transform 0.2s;
                    display: block;
                    width: 100%;
                    font-size: 16px;
                }
                
                .submit-btn:hover {
                    background-color: var(--primary-dark);
                    transform: translateY(-2px);
                }
                
                .submit-btn:active {
                    transform: translateY(0);
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                .shake {
                    animation: shake 0.4s ease-in-out;
                }
            `;

            document.head.appendChild(style);
        }

        // Animation for modal appearance
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';

            // Focus the first input field
            document.getElementById('name').focus();
        }, 10);

        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            closeContactModal(modal);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeContactModal(modal);
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && document.querySelector('.contact-modal')) {
                closeContactModal(modal);
            }
        });

        // Form validation and submission
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                modal.querySelector('.modal-content').classList.add('shake');
                setTimeout(() => {
                    modal.querySelector('.modal-content').classList.remove('shake');
                }, 400);
                return;
            }

            // Here you would typically send this data to a server
            // For now, we'll just show a success message
            console.log('Form submitted:', { name, email, subject, message });

            // Show success message
            modal.querySelector('.modal-content').innerHTML = `
                <h2>Thank You!</h2>
                <p class="success-message">Your message has been sent successfully. I'll get back to you soon!</p>
                <div class="success-checkmark">
                    <div class="check-icon">
                        <span class="icon-line line-tip"></span>
                        <span class="icon-line line-long"></span>
                    </div>
                </div>
                <button class="submit-btn close-btn">Close</button>
            `;

            // Add success styles
            const successStyle = document.createElement('style');
            successStyle.textContent = `
                .success-message {
                    text-align: center;
                    margin: 20px 0;
                    color: #333;
                }
                
                .success-checkmark {
                    width: 80px;
                    height: 80px;
                    margin: 0 auto;
                    position: relative;
                }
                
                .check-icon {
                    width: 80px;
                    height: 80px;
                    position: relative;
                    border-radius: 50%;
                    box-sizing: content-box;
                    border: 4px solid var(--primary-color);
                }
                
                .check-icon::before {
                    top: 3px;
                    left: -2px;
                    width: 30px;
                    transform-origin: 100% 50%;
                    border-radius: 100px 0 0 100px;
                }
                
                .check-icon::after {
                    top: 0;
                    left: 30px;
                    width: 60px;
                    transform-origin: 0 50%;
                    border-radius: 0 100px 100px 0;
                    animation: rotate-circle 4.25s ease-in;
                }
                
                .check-icon::before, .check-icon::after {
                    content: '';
                    height: 100px;
                    position: absolute;
                    background: #FFFFFF;
                    transform: rotate(-45deg);
                }
                
                .check-icon .icon-line {
                    height: 5px;
                    background-color: var(--primary-color);
                    display: block;
                    border-radius: 2px;
                    position: absolute;
                    z-index: 10;
                }
                
                .check-icon .icon-line.line-tip {
                    top: 46px;
                    left: 14px;
                    width: 25px;
                    transform: rotate(45deg);
                    animation: icon-line-tip 0.75s;
                }
                
                .check-icon .icon-line.line-long {
                    top: 38px;
                    right: 8px;
                    width: 47px;
                    transform: rotate(-45deg);
                    animation: icon-line-long 0.75s;
                }
                
                @keyframes icon-line-tip {
                    0% {
                        width: 0;
                        left: 1px;
                        top: 19px;
                    }
                    54% {
                        width: 0;
                        left: 1px;
                        top: 19px;
                    }
                    70% {
                        width: 50px;
                        left: -8px;
                        top: 37px;
                    }
                    84% {
                        width: 17px;
                        left: 21px;
                        top: 48px;
                    }
                    100% {
                        width: 25px;
                        left: 14px;
                        top: 46px;
                    }
                }
                
                @keyframes icon-line-long {
                    0% {
                        width: 0;
                        right: 46px;
                        top: 54px;
                    }
                    65% {
                        width: 0;
                        right: 46px;
                        top: 54px;
                    }
                    84% {
                        width: 55px;
                        right: 0px;
                        top: 35px;
                    }
                    100% {
                        width: 47px;
                        right: 8px;
                        top: 38px;
                    }
                }
            `;

            document.head.appendChild(successStyle);

            // Close button functionality
            const closeBtn = modal.querySelector('.close-btn');
            closeBtn.addEventListener('click', () => {
                closeContactModal(modal);
            });
        });
    }

    /**
     * Closes the contact modal with animation
     */
    function closeContactModal(modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }

    /**
     * Creates a theme toggle button
     */
    function createThemeToggle() {
        // Create the theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
        themeToggle.setAttribute('aria-label', 'Change theme colors');

        // Add it to the card
        profileCard.appendChild(themeToggle);

        // Add styles for the theme toggle
        const themeToggleStyle = document.createElement('style');
        themeToggleStyle.textContent = `
            .theme-toggle {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--text-light);
                border: none;
                color: var(--primary-color);
                font-size: 18px;
                cursor: pointer;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
            }
            
            .theme-toggle:hover {
                transform: rotate(30deg);
                background-color: var(--primary-dark);
                color: var(--text-light);
            }
            
            .theme-options {
                position: absolute;
                top: 60px;
                right: 15px;
                background-color: white;
                border-radius: 10px;
                padding: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                width: 120px;
                z-index: 100;
                transform: scale(0);
                transform-origin: top right;
                transition: transform 0.3s ease;
            }
            
            .theme-options.active {
                transform: scale(1);
            }
            
            .color-option {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                cursor: pointer;
                border: 2px solid white;
                transition: transform 0.2s ease;
            }
            
            .color-option:hover {
                transform: scale(1.2);
            }
        `;

        document.head.appendChild(themeToggleStyle);

        // Add click event to toggle theme options
        themeToggle.addEventListener('click', () => {
            // Remove existing theme options if they exist
            const existingOptions = document.querySelector('.theme-options');
            if (existingOptions) {
                existingOptions.remove();
                return;
            }

            // Create theme options
            const themeOptions = document.createElement('div');
            themeOptions.className = 'theme-options';

            // Define color themes
            const themes = [
                { primary: '#009FAF', dark: '#007A85', accent: '#FF6B6B' }, // Default
                { primary: '#6200EA', dark: '#4A00B0', accent: '#03DAC6' }, // Purple
                { primary: '#C2185B', dark: '#8C0D3E', accent: '#00BCD4' }, // Pink
                { primary: '#00796B', dark: '#004D40', accent: '#FFC107' }, // Teal
                { primary: '#E65100', dark: '#BF360C', accent: '#2196F3' }, // Orange
                { primary: '#2E7D32', dark: '#1B5E20', accent: '#FF4081' }  // Green
            ];

            // Create color options
            themes.forEach(theme => {
                const colorOption = document.createElement('div');
                colorOption.className = 'color-option';
                colorOption.style.backgroundColor = theme.primary;

                colorOption.addEventListener('click', () => {
                    // Apply the theme
                    document.documentElement.style.setProperty('--primary-color', theme.primary);
                    document.documentElement.style.setProperty('--primary-dark', theme.dark);
                    document.documentElement.style.setProperty('--accent-color', theme.accent);

                    // Close the options
                    themeOptions.remove();
                });

                themeOptions.appendChild(colorOption);
            });

            // Add to the card
            profileCard.appendChild(themeOptions);

            // Animate appearance
            setTimeout(() => {
                themeOptions.classList.add('active');
            }, 10);

            // Close when clicking outside
            document.addEventListener('click', function closeThemeOptions(e) {
                if (!themeOptions.contains(e.target) && e.target !== themeToggle) {
                    themeOptions.classList.remove('active');
                    setTimeout(() => {
                        if (themeOptions.parentNode) {
                            themeOptions.parentNode.removeChild(themeOptions);
                        }
                    }, 300);
                    document.removeEventListener('click', closeThemeOptions);
                }
            });
        });
    }

    /**
     * Creates a download resume button
     */
    function createDownloadButton() {
        // Create a new button in the action buttons section
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'button download-btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Resume';

        // Add it to the action buttons
        document.querySelector('.action-buttons').appendChild(downloadBtn);

        // Add styles
        const downloadBtnStyle = document.createElement('style');
        downloadBtnStyle.textContent = `
            .download-btn {
                background-color: #4CAF50;
                color: white;
            }
            
            .download-btn:hover {
                background-color: #388E3C;
            }
            
            @media (max-width: 480px) {
                .action-buttons {
                    flex-direction: column;
                    gap: 10px;
                }
            }
        `;

        document.head.appendChild(downloadBtnStyle);

        // Add click event
        downloadBtn.addEventListener('click', () => {
            // In a real implementation, this would link to an actual resume file
            alert('Resume download would start here. Replace this with a real download link to your resume PDF.');

            // Example of how to trigger a download:
            // const link = document.createElement('a');
            // link.href = '../resume/your_resume.pdf';
            // link.download = 'Abderrahmane_Meradji_Resume.pdf';
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
        });
    }
});

// Add CSS animations for page load
document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .card {
            animation: fadeIn 0.8s ease forwards;
        }
        
        .images.animate-in {
            animation: pop 0.5s ease forwards;
        }
        
        .social-icon {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .social-icon.animate-in {
            animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes pop {
            0% { transform: scale(0.8); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        :root {
            --profile-hue: 190;
            --primary-color: hsl(var(--profile-hue), 100%, 35%);
            --primary-dark: hsl(var(--profile-hue), 100%, 25%);
            --primary-light: hsl(var(--profile-hue), 70%, 55%);
            --accent-color: hsl(calc(var(--profile-hue) + 180), 100%, 70%);
        }
    `;

    document.head.appendChild(style);
});
