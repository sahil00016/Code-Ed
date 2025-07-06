const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const aiController = require("../controllers/ai.controller")

const router = express.Router();

// Helper: Path to reviews file
const REVIEWS_FILE = path.join(__dirname, '../../reviews.json');

// Helper: Load reviews
function loadReviews() {
  if (!fs.existsSync(REVIEWS_FILE)) return {};
  return JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf-8'));
}
// Helper: Save reviews
function saveReviews(reviews) {
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
}

// Placeholder auth middleware (replace with real Clerk/JWT check)
function requireAuth(req, res, next) {
  // TODO: Implement real authentication check
  // For now, allow all requests (for demo)
  next();
}

// POST /api/review - Save a review and return its ID
router.post('/review', requireAuth, (req, res) => {
  const { code, review, prompt, promptResponse, userId } = req.body;
  if (!code || !review || !userId) return res.status(400).json({ error: 'Missing fields' });
  const id = uuidv4();
  const reviews = loadReviews();
  reviews[id] = { id, code, review, prompt, promptResponse, userId, createdAt: Date.now() };
  saveReviews(reviews);
  res.json({ id });
});

// GET /api/review/:id - Fetch a review by ID
router.get('/review/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const reviews = loadReviews();
  if (!reviews[id]) return res.status(404).json({ error: 'Not found' });
  res.json(reviews[id]);
});


router.post("/get-review", aiController.getReview)


module.exports = router;