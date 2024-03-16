<p align="center">
        <img src="https://i.imgur.com/OnnxHIH.png" align="center" alt="flyway-icon" height="128px" width="128px"  />
</p>
<h1 align="center" style="border: 0;">Auth Service - Flyway</h1>

## Setup Project

Clone the project

```bash
  git clone https://github.com/kamal0620040/auth-service
```

Go to the project directory

```bash
  cd auth-service
```

Install dependencies present in [package.json](https://github.com/kamal0620040/auth-service/blob/master/package.json) file.

```bash
  npm install
```

Set environment variable present in .env.example file

Go inside the `src` folder and execute the following command:

```bash
    npx sequelize init
```

- By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder.
- If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql
- If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

To run the server execute

```bash
   npm run dev
```
