const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable
const users = [];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.post('/register', async (req, res) => {
  try {
    const { email, username, name, password } = req.body;

    if (users.find(u => u.username === username || u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, username, name, password: hashedPassword };
    users.push(user);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.get('/userProfile', authenticateToken, (req, res) => {
  const user = users.find(u => u.username === req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json({
    name: user.name,
    username: user.username,
    email: user.email
  });
});

app.get('/schemes', authenticateToken, (req, res) => {
  const schemes = [
    {
      id: 1,
      title: 'PM-KISAN',
      description: 'Direct income support of ₹6000 per year to eligible farmer families',
      eligibility: 'Small and marginal farmers'
    },
    {
      id: 2,
      title: 'Soil Health Card Scheme',
      description: 'Provides information on soil nutrient status and recommendations',
      eligibility: 'All farmers'
    }
  ];
  res.json(schemes);
});

app.get('/market-trends', authenticateToken, (req, res) => {
  const trends = {
    crops: [
      { name: 'Wheat', price: 2100, unit: 'quintal', trend: 'up' },
      { name: 'Rice', price: 1900, unit: 'quintal', trend: 'stable' },
      { name: 'Maize', price: 1800, unit: 'quintal', trend: 'down' }
    ]
  };
  res.json(trends);
});

app.get('/equipment', authenticateToken, (req, res) => {
  const equipment = [
    {
      id: 1,
      name: 'Tractor',
      type: 'Heavy Machinery',
      status: 'available',
      pricePerDay: 2000
    },
    {
      id: 2,
      name: 'Irrigation System',
      type: 'Water Management',
      status: 'available',
      pricePerDay: 500
    }
  ];
  res.json(equipment);
});

app.post('/equipment/book/:id', authenticateToken, (req, res) => {
  // Booking logic would go here
  res.json({ message: 'Equipment booked successfully' });
});

app.post('/crop-recommendation', authenticateToken, (req, res) => {
  // Soil analysis and crop recommendation logic would go here
  const recommendations = {
    suitable_crops: ['Wheat', 'Rice', 'Maize'],
    soil_health: 'Good',
    recommendations: 'Based on your soil analysis, these crops are recommended...'
  };
  res.json(recommendations);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});