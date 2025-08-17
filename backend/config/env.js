const envVariables = [
  'MONGO_URI',
  'JWT_SECRET',
  'NODE_ENV'
];

envVariables.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} is not defined in environment variables`);
    process.exit(1);
  }
});