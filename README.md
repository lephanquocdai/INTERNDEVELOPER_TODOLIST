# Todo List Application

## 1. Giới thiệu
Dự án Quản lý công việc (Todo List) được xây dựng với kiến trúc Client-Server, sử dụng Spring Boot cho Backend và React cho Frontend. Dự án đáp ứng đầy đủ yêu cầu bài test Intern Developer bao gồm chức năng CRUD, tìm kiếm, lọc, UI hiện đại và đóng gói bằng Docker.

## 2. Công nghệ
- **Backend:** Java 21, Spring Boot 3, Spring Data JPA, H2/MySQL, Validation.
- **Frontend:** React, Vite, Tailwind CSS v4, Axios.
- **Triển khai:** Docker & Docker Compose.

## 3. Cách chạy dự án (Local)
**Yêu cầu:** Java 21, Node.js 18+.

**Chạy Backend:**
```bash
cd TODO_BACKEND
./mvnw spring-boot:run
```
(Chạy ở http://localhost:8080)

**Chạy Frontend:**
```bash
cd TODO_FRONTEND
npm install
npm run dev
```
(Chạy ở http://localhost:5173)

## 4. Cách chạy dự án (Docker)
Để chạy toàn bộ hệ thống bằng Docker, chạy lệnh sau tại thư mục gốc:

```bash
docker-compose up --build -d
```
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## 5. Danh sách API Endpoints
- `GET /api/todos`: Lấy danh sách (hỗ trợ phân trang và bộ lọc).
- `POST /api/todos`: Tạo công việc mới.
- `PUT /api/todos/{id}`: Cập nhật thông tin công việc.
- `DELETE /api/todos/{id}`: Xóa công việc.
- `PATCH /api/todos/{id}/toggle`: Đánh dấu trạng thái.
