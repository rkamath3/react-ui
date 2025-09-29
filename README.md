# SEMICopilot Dashboard

A professional React-based analytics dashboard for semiconductor process monitoring, root cause analysis, and optimization. Built with modern web technologies and designed for semiconductor manufacturing process management.

## Features

### 📊 **Analytics & Visualization**
- **Previous Runs Analysis**: Sortable and searchable tabular data with error threshold highlighting
- **Root Cause Analysis (RCA)**: Interactive recipe comparison with time-series line charts
- **Process Optimizer**: Area charts for optimization trends and pie charts for metadata contribution analysis
- **Collapsible Sections**: Accordion-style interface with mutually exclusive panels
- **Interactive Charts**: Hover tooltips, legends, and responsive chart sizing

### 🎨 **User Experience**
- **Responsive Design**: Mobile-first design that works on phones, tablets, and desktops
- **Professional Branding**: Custom SEMICopilot logo with semiconductor-themed design
- **Collapsible Sidebar**: Minimizable navigation with icon-only collapsed state
- **Mobile Overlay**: Touch-friendly mobile navigation with backdrop overlay
- **Clickable Headers**: Enhanced UX with full header click areas for collapsible sections

### ⚙️ **Technical Features**
- **Dynamic Data Configuration**: JSON-based data management for easy customization
- **User Profile Management**: Editable user information and activity tracking
- **Docker Containerization**: Production-ready deployment with health checks
- **Modern Tech Stack**: React 18, Tailwind CSS, Chart.js integration

## Technology Stack

- **Frontend**: React 18 with Hooks and modern JavaScript
- **Styling**: Tailwind CSS 3.4 with custom design system
- **Charts**: Chart.js 4.4 with react-chartjs-2 (Line, Area, and Pie charts)
- **Icons**: React Icons 4.12 (Font Awesome)
- **Fonts**: Google Fonts (Outfit family)
- **State Management**: React useState and useEffect hooks
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Containerization**: Docker with Node.js 18 Alpine
- **Build Tools**: Create React App with PostCSS and Autoprefixer

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-ui
   ```

2. **Build and run with Docker**
   ```bash
   # Build the Docker image
   docker build -t semicopilot-dashboard .

   # Run the container
   docker run -p 3000:3000 --name semicopilot-dashboard semicopilot-dashboard
   ```

3. **Access the application**
   - Open your browser and go to: http://localhost:3000

### Local Development

1. **Prerequisites**
   - Node.js 18+ 
   - npm or yarn

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Data Configuration

### 1. Previous Runs Data (`public/data/previous-runs.json`)

Configure tabular data structure:

```json
{
  "columns": [
    {
      "key": "column_name",
      "title": "Display Title",
      "sortable": true
    }
  ],
  "data": [
    {
      "column_name": "value",
      "ET": false  // Error Threshold flag for row highlighting
    }
  ]
}
```

**Adding New Columns:**
1. Add column definition to `columns` array
2. Add corresponding data fields to each record in `data` array
3. Set `sortable: true` to enable sorting for the column

### 2. Recipe Metadata (`public/data/recipes-metadata.json`)

Configure recipes, their time-series data, and optimization contributions:

```json
{
  "recipes": ["R1", "R2", "R3", ...],
  "metadata": {
    "R1": {
      "parameter_name": {
        "timeseries": [value1, value2, ..., value10]
      },
      "optimized_value": {
        "timeseries": [opt1, opt2, ..., opt10]
      },
      "optimization_contribution": {
        "pressure": 28.5,
        "temperature": 35.2,
        "flow_rate": 22.8,
        "ph_level": 13.5
      }
    }
  },
  "analysis": {
    "R1_vs_R2": "Analysis text for recipe comparison"
  }
}
```

**Adding New Recipes:**
1. Add recipe ID to `recipes` array
2. Create metadata object with parameter time-series data
3. Add analysis text for recipe comparisons

**Adding New Parameters:**
1. Add parameter object to recipe metadata with `timeseries` array
2. Include up to 10 data points for time-series visualization
3. Add corresponding `optimization_contribution` percentage values
4. Parameter names will appear in dropdown menus and pie chart labels

## Application Structure

```
src/
├── components/
│   ├── Sidebar.js              # Navigation sidebar with responsive design
│   ├── MainContent.js          # Main content router with mobile header
│   ├── SEMICopilotLogo.js      # Custom SVG logo component
│   └── panels/
│       ├── PreviousRuns.js     # Tabular data with search and sort
│       ├── RCAAnalysis.js      # Recipe comparison with collapsible sections
│       ├── Optimizer.js        # Optimization trends and pie charts
│       └── UserProfile.js      # User management with statistics
├── App.js                      # Main app with responsive state management
├── index.js                    # Application entry point
├── index.css                   # Tailwind CSS with custom components
└── App.css                     # Additional app styles

public/
├── data/
│   ├── previous-runs.json      # Tabular data configuration
│   └── recipes-metadata.json   # Recipe, metadata, and contribution data
└── logo-semicopilot.svg        # SEMICopilot brand logo
```

## Customization

### Styling

The application uses Tailwind CSS with custom design tokens. Edit `tailwind.config.js` for theme customization:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-500': '#465fff',     // Primary brand color
        'success-500': '#12b76a',   // Success indicators  
        'error-500': '#f04438',     // Error indicators
        'warning-500': '#f79009',   // Warning indicators
        // ... more color tokens
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
};
```

Custom component classes are defined in `src/index.css` using Tailwind's `@layer` directive.

### Company Branding

1. **Logo**: Customize `src/components/SEMICopilotLogo.js` or replace with your own component
2. **Company Name**: Update branding throughout the application
3. **Colors**: Modify Tailwind color tokens in `tailwind.config.js`
4. **Title**: Update page title and meta description in `public/index.html`
5. **Package Name**: Update `name` field in `package.json`

### Adding New Menu Items

1. **Add menu item** to `src/components/Sidebar.js`:
   ```javascript
   {
     id: 'new-panel',
     label: 'New Panel',
     icon: <FaIcon />
   }
   ```

2. **Create panel component** in `src/components/panels/`

3. **Add route** in `src/components/MainContent.js`:
   ```javascript
   case 'new-panel':
     return <NewPanel />;
   ```

## Data Management

### Error Threshold Highlighting

Rows in the Previous Runs table are highlighted in red when the `ET` field is `true`. This provides visual indication of runs that exceeded error thresholds.

### Time Series Data

Each metadata parameter supports up to 10 time-series data points. The application automatically generates time labels (T1, T2, ..., T10) for chart visualization.

### Analysis Text

The RCA panel displays automated analysis text based on recipe combinations. Analysis keys follow the pattern `"R1_vs_R2"` or `"R2_vs_R1"` for bidirectional lookup.

## Docker Configuration

### Production Deployment

```bash
       # Build the Docker image
       docker build -t semicopilot-dashboard .

       # Run the container in detached mode
       docker run -d -p 3000:3000 --name semicopilot-dashboard semicopilot-dashboard

# View logs
docker logs -f semicopilot-dashboard

# Stop and remove container
docker stop semicopilot-dashboard
docker rm semicopilot-dashboard
```

### Docker Management Commands

```bash
# Check if container is running
docker ps

# Access container shell (for debugging)
docker exec -it semicopilot-dashboard sh

# Remove image (if needed)
docker rmi semicopilot-dashboard
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- **Lazy Loading**: Data is loaded asynchronously from JSON files
- **Canvas Rendering**: Charts use Canvas for optimal performance with large datasets
- **Responsive Design**: Mobile-first approach with efficient breakpoint handling
- **Client-Side Operations**: Table sorting, filtering, and chart interactions are client-side
- **Optimized Builds**: Production builds are minified and optimized
- **Efficient State Management**: React hooks minimize unnecessary re-renders

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill existing process using port 3000
   lsof -ti:3000 | xargs kill -9
   
   # Or run Docker on a different port
   docker run -p 3001:3000 --name semicopilot-dashboard semicopilot-dashboard
   ```

2. **Data not loading**
   - Verify JSON files are in `public/data/` directory
   - Check browser console for fetch errors
   - Ensure JSON syntax is valid

3. **Charts not rendering**
   - Verify Chart.js dependencies are installed
   - Check console for JavaScript errors
   - Ensure data format matches expected structure

### Development Tips

- Use browser developer tools to inspect network requests
- Check React Developer Tools for component state
- Monitor console for warnings and errors
- Test responsive design using device emulation
- Use Tailwind CSS IntelliSense for efficient styling
- Leverage Chart.js documentation for chart customization

## Responsive Design Features

### 📱 **Mobile (< 768px)**
- **Overlay Sidebar**: Slides in from left with backdrop
- **Auto-close Navigation**: Sidebar closes after menu selection
- **Mobile Header Button**: Hamburger menu in main content header
- **Compact Tables**: Horizontal scroll with smaller padding
- **Stacked Forms**: Single-column layout for all form elements
- **Smaller Charts**: Optimized chart heights for mobile viewing

### 💻 **Tablet (768px - 1024px)**
- **Responsive Grids**: Forms adapt from single to multi-column
- **Flexible Sidebar**: Maintains desktop-style navigation
- **Medium Charts**: Appropriately sized for tablet screens
- **Touch-friendly**: Larger touch targets and proper spacing

### 🖥️ **Desktop (> 1024px)**
- **Full Experience**: Large charts and multi-column layouts
- **Collapsible Sidebar**: Icon-only collapsed state
- **Optimal Spacing**: Full padding and margins
- **Advanced Interactions**: Hover effects and detailed tooltips

## Chart Types & Features

### 📈 **Line Charts (RCA Analysis)**
- **Time-series Comparison**: Compare metadata parameters between recipes
- **Interactive Tooltips**: Hover for exact values
- **Dynamic Legends**: Toggle data series visibility
- **Responsive Sizing**: Adapts to screen size (256px mobile, 384px desktop)

### 📊 **Area Charts (Optimizer Trends)**
- **Optimization Visualization**: Stacked area charts for trend analysis
- **Gradient Fills**: Professional styling with transparency
- **Smooth Curves**: Tension curves for better visual appeal

### 🥧 **Pie Charts (Optimization Analysis)**
- **Metadata Contribution**: Shows percentage contribution of each parameter
- **Color-coded Segments**: Consistent brand colors across charts
- **Bottom Legends**: Clean positioning with point-style indicators
- **Percentage Tooltips**: Displays exact contribution percentages
- **Dual Display**: Side-by-side comparison of two recipes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**SEMICopilot Dashboard** - Professional Semiconductor Process Analytics Solution

Built with React 18, Tailwind CSS, and Chart.js for comprehensive semiconductor manufacturing process monitoring, analysis, and optimization.
