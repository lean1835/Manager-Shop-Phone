# Shop Phone Backend — VTI Style

- **Package**: `com.vti.shop` (Controller/Service/Repository layers + DTO, ModelMapper)
- **Spring Boot**: 3.5.5 (parent)
- **DB**: H2 file as default, MySQL profile `mysql` available in `application.yml`
- **OpenAPI**: /swagger-ui.html
- **CORS**: allow `http://localhost:3000` & expose `X-Total-Count`

## Run
```bash
mvn spring-boot:run
# or use MySQL
SPRING_PROFILES_ACTIVE=mysql mvn spring-boot:run
```

## API (compatible with your React FE)
- `GET /accounts` → login client-side
- Products `/products` (supports `?name_like`, `?price`, optional `?_page&_limit`)
- Customers `/customers` (supports `?name_like`/`?address_like`)
- Suppliers `/suppliers` (supports `?name_like`)
- Staff `/staff` (DTO có `accountID`)
- Stock `/stock` (trả nested product/supplier + header `X-Total-Count`)

> Phong cách: dùng **ModelMapper** + **DTO**, **Service Interface + Impl**, Lombok `@Data`, cấu trúc giống project tham chiếu.
