# LO Digital LLC

Corporate website of LO Digital LLC. Live domain: https://lodigitalsolutions-official.com

Local:

```
start.bat
```

http://127.0.0.1:8780

## Namecheap DNS (Advanced DNS)

Delete the parking records (`www` CNAME to parkingpage, and the URL Redirect on `@`).

Then add:

| Type | Host | Value | TTL |
|---|---|---|---|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |
| CNAME Record | www | lurahold.github.io. | Automatic |

Save. Wait a few minutes. Site: https://lodigitalsolutions-official.com

See CLAUDE.md for entity data.
