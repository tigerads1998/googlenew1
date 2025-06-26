const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Netlify Auto Deploy...\n');

// Tạo netlify.toml cho admin dashboard
const adminNetlifyConfig = `
[build]
  publish = "admin-gui"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
`;

// Tạo netlify.toml cho frontend
const frontendNetlifyConfig = `
[build]
  publish = "google-login-clone"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
`;

try {
    // Deploy Admin Dashboard
    console.log('📊 Deploying Admin Dashboard...');
    fs.writeFileSync('netlify.toml', adminNetlifyConfig);
    
    const adminResult = execSync('netlify deploy --dir=admin-gui --prod --open', {
        encoding: 'utf8',
        stdio: 'pipe'
    });
    
    console.log('✅ Admin Dashboard deployed successfully!');
    console.log(adminResult);
    
    // Deploy Frontend
    console.log('\n🔐 Deploying Frontend Login Clone...');
    fs.writeFileSync('netlify.toml', frontendNetlifyConfig);
    
    const frontendResult = execSync('netlify deploy --dir=google-login-clone --prod --open', {
        encoding: 'utf8',
        stdio: 'pipe'
    });
    
    console.log('✅ Frontend deployed successfully!');
    console.log(frontendResult);
    
    // Cleanup
    fs.unlinkSync('netlify.toml');
    
    console.log('\n🎉 ALL DEPLOYMENTS COMPLETED SUCCESSFULLY!');
    console.log('🌐 Your sites are now live on Netlify!');
    
} catch (error) {
    console.error('❌ Deployment failed:', error.message);
    console.log('\n🔧 Let\'s try alternative method...');
    
    // Alternative method: Use drag and drop
    console.log('📁 Manual deployment instructions:');
    console.log('1. Go to https://app.netlify.com/drop');
    console.log('2. Drag admin-gui folder for Admin Dashboard');
    console.log('3. Drag google-login-clone folder for Frontend');
    console.log('4. Both sites will be deployed automatically!');
} 