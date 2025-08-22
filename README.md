# International Students Club (ISC) Website

A modern, responsive website for the International Students Club at PSU University. Built with HTML5, CSS3, and JavaScript, featuring a beautiful design with the specified color theme.

## 🎨 Color Theme

The website uses the following color palette:
- **Primary**: `#2b2564` (Deep Purple)
- **Secondary**: `#0ba89d` (Teal)
- **Accent**: `#ef4337` (Red)
- **Highlight**: `#ffba4a` (Orange)
- **White**: `#ffffff`

## 🚀 Features

### Core Sections
- **Hero Landing Page** - Eye-catching introduction with call-to-action buttons
- **About Us** - Club information and statistics
- **Mission & Vision** - Core values and objectives
- **Meet the Team** - Leadership team showcase
- **Our Projects** - Current initiatives and programs
- **Photo Gallery** - Event photos and memories
- **Registration** - Membership application form
- **Contact Us** - Contact information and contact form

### Technical Features
- **Responsive Design** - Works perfectly on all devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Interactive Elements** - Hover effects, smooth scrolling, and form validation
- **Mobile Navigation** - Hamburger menu for mobile devices
- **Accessibility** - Keyboard navigation and screen reader friendly
- **Performance Optimized** - Fast loading with optimized code

## 📁 File Structure

```
iscWebsite/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Setup Instructions

### Option 1: Simple Setup (Recommended)
1. Download all files to your computer
2. Open `index.html` in any modern web browser
3. The website is ready to use!

### Option 2: Local Server (For Development)
1. Install a local server (like Live Server for VS Code)
2. Open the project folder in your code editor
3. Start the local server
4. Access the website at `http://localhost:3000` (or your server's URL)

### Option 3: Web Hosting
1. Upload all files to your web hosting provider
2. Ensure the files maintain their structure
3. Access your website at your domain

## 🎯 Customization Guide

### Updating Content

#### Club Information
- Edit the hero section in `index.html` (lines 60-75)
- Update about section content (lines 85-120)
- Modify mission and vision statements (lines 130-170)

#### Team Members
- Update team member information in `index.html` (lines 180-250)
- Replace placeholder icons with actual photos
- Update social media links

#### Projects
- Modify project descriptions in `index.html` (lines 260-320)
- Add or remove project cards as needed
- Update project tags and categories

#### Contact Information
- Update contact details in `index.html` (lines 380-420)
- Modify office hours and location
- Update email and phone numbers

### Styling Changes

#### Colors
- Modify CSS variables in `styles.css` (lines 1-15)
- All colors are defined as CSS custom properties for easy customization

#### Layout
- Adjust grid layouts in `styles.css`
- Modify spacing and padding values
- Update responsive breakpoints

#### Typography
- Change font family in `styles.css` (line 25)
- Update font sizes and weights as needed

### Adding Real Images

1. **Team Photos**: Replace the Font Awesome icons with actual images
   ```html
   <!-- Replace this: -->
   <i class="fas fa-user-circle"></i>
   
   <!-- With this: -->
   <img src="path/to/team-member.jpg" alt="Team Member Name">
   ```

2. **Gallery Images**: Replace placeholder divs with actual images
   ```html
   <!-- Replace this: -->
   <div class="gallery-placeholder">
       <i class="fas fa-image"></i>
       <p>Event Name</p>
   </div>
   
   <!-- With this: -->
   <img src="path/to/event-image.jpg" alt="Event Description">
   ```

3. **Hero Image**: Add a background image to the hero section
   ```css
   .hero {
       background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%), 
                   url('path/to/hero-image.jpg');
       background-size: cover;
       background-position: center;
   }
   ```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

Key responsive features:
- Mobile hamburger navigation
- Flexible grid layouts
- Optimized typography scaling
- Touch-friendly buttons and forms

## 🔧 JavaScript Features

### Interactive Elements
- **Mobile Navigation** - Smooth hamburger menu
- **Smooth Scrolling** - Navigation links scroll smoothly to sections
- **Form Validation** - Client-side form validation with notifications
- **Scroll Effects** - Navbar background changes on scroll
- **Animations** - Intersection Observer for scroll-triggered animations
- **Counter Animation** - Animated statistics in the about section

### Performance Features
- **Debounced Scroll Events** - Optimized scroll handling
- **Lazy Loading** - Ready for image lazy loading implementation
- **Touch Support** - Mobile gesture support
- **Keyboard Navigation** - Full keyboard accessibility

## 📧 Form Integration

The website includes two forms:
1. **Registration Form** - For new member applications
2. **Contact Form** - For general inquiries

To connect forms to a backend:
1. Update form action URLs in `index.html`
2. Modify form handling in `script.js`
3. Add server-side validation and processing

## 🌐 Browser Support

- **Chrome** 60+
- **Firefox** 55+
- **Safari** 12+
- **Edge** 79+

## 📈 SEO Optimization

The website includes:
- Semantic HTML structure
- Meta tags for social sharing
- Alt text for images
- Proper heading hierarchy
- Fast loading times

## 🔒 Security Considerations

- Form validation (client-side)
- XSS prevention through proper HTML encoding
- HTTPS recommended for production

## 📞 Support

For questions or customization help:
1. Check the code comments for guidance
2. Review the CSS variables for easy customization
3. Test changes in a development environment first

## 🚀 Future Enhancements

Potential improvements:
- **Image Gallery Lightbox** - Modal view for gallery images
- **Blog Section** - News and updates
- **Event Calendar** - Upcoming events display
- **Member Portal** - Login system for members
- **Multilingual Support** - Multiple language options
- **Dark Mode** - Toggle between light and dark themes

## 📄 License

This website template is created for the International Students Club at PSU University. Feel free to modify and use for your organization.

---

**Built with ❤️ for the International Students Club community** 