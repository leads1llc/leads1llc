echo "Installing Cerboot"
apt update
apt install certbot python3-certbot-nginx --yes

echo "Running Cerboot"
certbot --nginx --non-interactive --agree-tos --email camilocamargo49@gmail.com -d leads1llc.com -d www.leads1llc.com 
certbot --nginx --non-interactive --agree-tos --email camilocamargo49@gmail.com -d app.leads1llc.com -d www.app.leads1llc.com 

echo "Running nginx"

nginx -g "daemon off;"
