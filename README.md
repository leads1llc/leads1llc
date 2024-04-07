<div align="center">
   <a href="https://www.leads1llc.com">
      <picture>
         <source width=100 media="(prefers-color-scheme: dark)" srcset="./assets/icon_light.png">
         <img width=100  alt="Leads1LLC icon" src="./assets/icon_dark.png">
      </picture>
   </a>
</div>

# leads1llc

## Getting Started
To getting started you must copy `dev.env` to `.env`.


### Mysql Unsafe Configuration
Run first docker mysql and change security password method.

1. Run docker mysql container.
```bash
docker compose up -d mysql
```
2. Edit mysql password method.
```bash
ALTER USER 'strapi'@'%' IDENTIFIED WITH mysql_native_password BY 'strapi';
```

And finally run all the containers.

### Run Remix + Strapi Containers
```bash
docker compose up -d web core
```

The program expose ports 3000 for Remix and Strapi 1337


## How to make a backup
1. Connect to core container 

```bash
docker compose exec core bash
```

2. Then, use strapi export command and set a security password

```bash
yarn strapi export
```
3. Copy the export file into the server.

```bash
docker compose cp core:/app/export_<date>.tar.gz.enc .
```

4. Copy remotetly the backup to your machine
```bash
scp root@<server-ip>://root/leads1llc/export_<date>.tar.gz.enc .
```

5. You should copy the backup using mv the backup to packages/core is the same that used `docker cp`
```bash
mv export_<date>.tar.gz.enc packages/core/
```

6. Import the backup
```bash
yarn strapi import -f export_<date>.tar.gz.enc
```