module.exports = {
  apps: [
    {
      name: "cpu-pme",
      script: "npm",
      args: "start",
      cwd: "/home/cpupm452/cpu-pme",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 4100,
      },
    },
  ],
};
