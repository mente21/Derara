const express = require('express');
const router = express.Router();
const managerCtrl = require('../controllers/managerController');
const employeeCtrl = require('../controllers/employeeController');
const customerCtrl = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/authMiddleware');

// --- PUBLIC ROUTES (No Auth Required) ---
router.get('/services', managerCtrl.getServices);
router.get('/products', managerCtrl.getProducts);
router.get('/testimonials', managerCtrl.getTestimonials);
router.get('/certificates', managerCtrl.getCertificates);
router.get('/blogs', managerCtrl.getBlogs);
router.get('/gallery', managerCtrl.getGalleryItems);
router.get('/hero', managerCtrl.getHeroes);
router.get('/features', managerCtrl.getFeatures);
router.get('/about', managerCtrl.getAbouts);
router.get('/contact-info', managerCtrl.getContactInfos);
router.get('/history', managerCtrl.getHistory);

router.post('/contacts', customerCtrl.createContact);

// --- MANAGER ROUTES: UI CONTENT (Protected) ---
const roles = ['manager', 'admin'];

// Services
router.post('/services', protect, authorize(...roles), managerCtrl.createService);
router.put('/services/:id', protect, authorize(...roles), managerCtrl.updateService);
router.delete('/services/:id', protect, authorize(...roles), managerCtrl.deleteService);

// Products
router.post('/products', protect, authorize(...roles), managerCtrl.createProduct);
router.put('/products/:id', protect, authorize(...roles), managerCtrl.updateProduct);
router.delete('/products/:id', protect, authorize(...roles), managerCtrl.deleteProduct);

// Testimonials
router.post('/testimonials', protect, authorize(...roles), managerCtrl.createTestimonial);
router.put('/testimonials/:id', protect, authorize(...roles), managerCtrl.updateTestimonial);
router.delete('/testimonials/:id', protect, authorize(...roles), managerCtrl.deleteTestimonial);

// Certificates
router.post('/certificates', protect, authorize(...roles), managerCtrl.createCertificate);
router.put('/certificates/:id', protect, authorize(...roles), managerCtrl.updateCertificate);
router.delete('/certificates/:id', protect, authorize(...roles), managerCtrl.deleteCertificate);

// Blogs
router.post('/blogs', protect, authorize(...roles), managerCtrl.createBlog);
router.put('/blogs/:id', protect, authorize(...roles), managerCtrl.updateBlog);
router.delete('/blogs/:id', protect, authorize(...roles), managerCtrl.deleteBlog);

// Gallery
router.post('/gallery', protect, authorize(...roles), managerCtrl.createGalleryItem);
router.put('/gallery/:id', protect, authorize(...roles), managerCtrl.updateGalleryItem);
router.delete('/gallery/:id', protect, authorize(...roles), managerCtrl.deleteGalleryItem);

// Hero (Home)
router.post('/hero', protect, authorize(...roles), managerCtrl.createHero);
router.put('/hero/:id', protect, authorize(...roles), managerCtrl.updateHero);
router.delete('/hero/:id', protect, authorize(...roles), managerCtrl.deleteHero);

// Features
router.post('/features', protect, authorize(...roles), managerCtrl.createFeature);
router.put('/features/:id', protect, authorize(...roles), managerCtrl.updateFeature);
router.delete('/features/:id', protect, authorize(...roles), managerCtrl.deleteFeature);

// About
router.post('/about', protect, authorize(...roles), managerCtrl.createAbout);
router.put('/about/:id', protect, authorize(...roles), managerCtrl.updateAbout);
router.delete('/about/:id', protect, authorize(...roles), managerCtrl.deleteAbout);

// Contact Info
router.post('/contact-info', protect, authorize(...roles), managerCtrl.createContactInfo);
router.put('/contact-info/:id', protect, authorize(...roles), managerCtrl.updateContactInfo);
router.delete('/contact-info/:id', protect, authorize(...roles), managerCtrl.deleteContactInfo);

// History
router.post('/history', protect, authorize(...roles), managerCtrl.createHistory);
router.put('/history/:id', protect, authorize(...roles), managerCtrl.updateHistory);
router.delete('/history/:id', protect, authorize(...roles), managerCtrl.deleteHistory);

// --- MANAGER ROUTES: OPERATIONS ---
router.post('/tasks', protect, authorize(...roles), managerCtrl.assignTask);
router.get('/tasks/all', protect, authorize(...roles), managerCtrl.getAllTasks);
router.get('/requests/all', protect, authorize(...roles), managerCtrl.getAllRequests);
router.put('/requests/:id/respond', protect, authorize(...roles), managerCtrl.respondToRequest);

router.get('/contacts/all', protect, authorize(...roles), managerCtrl.getAllContacts);
router.delete('/contacts/:id', protect, authorize(...roles), managerCtrl.deleteContact);
router.put('/contacts/:id/respond', protect, authorize(...roles), managerCtrl.respondToContact);

// --- EMPLOYEE ROUTES ---
router.get('/tasks/my', protect, authorize('employee', ...roles), employeeCtrl.getMyTasks);
router.put('/tasks/:id/status', protect, authorize('employee', ...roles), employeeCtrl.updateTaskStatus);

// --- CUSTOMER ROUTES ---
router.post('/requests', protect, authorize('customer', 'admin'), customerCtrl.createRequest);
router.get('/requests/my', protect, authorize('customer', 'admin'), customerCtrl.getMyRequests);

module.exports = router;
