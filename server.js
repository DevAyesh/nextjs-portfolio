const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
// Force IPv4 to avoid Windows IPv6 permission issues
const hostname = process.env.HOSTNAME || '127.0.0.1';
const defaultPort = parseInt(process.env.PORT || '3001', 10);
// Try multiple ports if default fails (Windows may have reserved ports)
const portAttempts = [defaultPort, 4000, 5000, 8080, 3002, 3003];
let currentPortIndex = 0;
let port = portAttempts[currentPortIndex];

// #region agent log
fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:10',message:'Server initialization started',data:{dev,hostname,port,nodeEnv:process.env.NODE_ENV},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// #region agent log
fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:16',message:'Next.js app created',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

// Check port availability before binding
const net = require('net');
const checkPort = (port, hostname) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, hostname, () => {
      server.once('close', () => resolve({ available: true, error: null }));
      server.close();
    });
    server.on('error', (err) => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:28',message:'Port check error',data:{port,hostname,errorCode:err.code,errorMessage:err.message,errno:err.errno},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      resolve({ available: false, error: err });
    });
  });
};

// #region agent log
fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:38',message:'Starting app.prepare()',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

app.prepare().then(() => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:42',message:'Next.js app prepared',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  // Try ports sequentially until one works
  const tryNextPort = (portIndex) => {
    if (portIndex >= portAttempts.length) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:53',message:'All ports failed',data:{attemptedPorts:portAttempts},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      console.error('All port attempts failed. Tried:', portAttempts);
      process.exit(1);
      return;
    }
    
    port = portAttempts[portIndex];
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:60',message:'Trying port',data:{port,portIndex,totalAttempts:portAttempts.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    
    checkPort(port, hostname).then((result) => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:63',message:'Port check result',data:{port,hostname,available:result.available,error:result.error?{code:result.error.code,message:result.error.message,errno:result.error.errno}:null},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
      // #endregion

      if (!result.available) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:66',message:'Port failed, trying next',data:{port,errorCode:result.error?.code,nextPort:portAttempts[portIndex+1]},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        // Try next port
        tryNextPort(portIndex + 1);
        return;
      }

      // Port is available, create server
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:83',message:'Port available, creating server',data:{port},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      
      const server = createServer(async (req, res) => {
        try {
          const parsedUrl = parse(req.url, true);
          await handle(req, res, parsedUrl);
        } catch (err) {
          console.error('Error occurred handling', req.url, err);
          res.statusCode = 500;
          res.end('internal server error');
        }
      });
      
      // Attach error handler BEFORE calling listen
      server.once('error', (err) => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:97',message:'Server bind error, trying next port',data:{port,portIndex,hostname,errorCode:err.code,errorMessage:err.message,errno:err.errno,address:err.address,nextPortIndex:portIndex+1},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        console.error(`Port ${port} failed:`, err.message);
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:100',message:'Calling tryNextPort from error handler',data:{nextPortIndex:portIndex+1},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        tryNextPort(portIndex + 1);
      });
      
      server.listen(port, hostname, () => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:107',message:'Server started successfully',data:{port,hostname},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        console.log(`> Ready on http://${hostname}:${port}`);
      });
    });
  };
  
  tryNextPort(0);
}).catch((err) => {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/7c413ed7-ad89-44ec-82e9-b9efdc474556',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'server.js:88',message:'app.prepare() failed',data:{errorCode:err.code,errorMessage:err.message,stack:err.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  console.error('Failed to prepare Next.js app:', err);
  process.exit(1);
});

