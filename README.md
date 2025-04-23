# EduConnect - Nền tảng học tập đa môn

EduConnect là một nền tảng học tập trực tuyến đa môn, lấy cảm hứng từ italki nhưng mở rộng phạm vi sang tất cả các lĩnh vực học tập. Nền tảng này kết nối học viên với giáo viên chuyên môn trong nhiều lĩnh vực khác nhau, cho phép học tập cá nhân hóa và linh hoạt.

![EduConnect Screenshot](screenshots/homepage.png)

## Demo

Bạn có thể xem demo trực tuyến tại: [https://yiygzwmv.manus.space](https://yiygzwmv.manus.space)

## Tính năng chính

- **Tìm kiếm giáo viên**: Lọc theo môn học, ngôn ngữ giảng dạy, giá cả và thời gian
- **Hồ sơ giáo viên**: Xem thông tin chi tiết, đánh giá và lịch dạy của giáo viên
- **Đặt lịch học**: Chọn thời gian và đặt lịch học với giáo viên
- **Lớp học nhóm**: Tham gia các lớp học nhóm với nhiều học viên khác
- **Cộng đồng học tập**: Kết nối với cộng đồng học viên và giáo viên
- **Đa ngôn ngữ**: Hỗ trợ tiếng Việt và có thể mở rộng sang các ngôn ngữ khác

## Công nghệ sử dụng

- **Frontend**: Next.js, React, Tailwind CSS
- **Database**: MongoDB (thiết kế sẵn sàng, chưa triển khai)
- **Deployment**: Static site hosting

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js 18.0.0 trở lên
- npm hoặc yarn

### Cài đặt

1. Clone repository này:
```bash
git clone https://github.com/yourusername/educonnect.git
cd educonnect
```

2. Cài đặt các dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Chạy môi trường phát triển:
```bash
npm run dev
# hoặc
yarn dev
```

4. Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000)

### Build và triển khai

1. Build ứng dụng:
```bash
npm run build
# hoặc
yarn build
```

2. Triển khai thư mục `out` lên dịch vụ hosting tĩnh như Vercel, Netlify, hoặc GitHub Pages.

## Cấu trúc dự án

```
educonnect/
├── public/               # Tài nguyên tĩnh
│   └── images/           # Hình ảnh
├── src/                  # Mã nguồn
│   ├── app/              # Các trang Next.js
│   │   ├── booking/      # Trang đặt lịch học
│   │   ├── group-classes/# Trang lớp học nhóm
│   │   ├── teachers/     # Trang tìm kiếm và hồ sơ giáo viên
│   │   ├── layout.tsx    # Layout chung
│   │   └── page.tsx      # Trang chủ
│   └── components/       # Các component tái sử dụng
├── .eslintrc.json        # Cấu hình ESLint
├── next.config.js        # Cấu hình Next.js
├── package.json          # Dependencies và scripts
├── tailwind.config.js    # Cấu hình Tailwind CSS
└── tsconfig.json         # Cấu hình TypeScript
```

## Tài liệu thiết kế

- [Tài liệu yêu cầu](docs/requirements.md)
- [Thiết kế cơ sở dữ liệu](docs/database_schema.md)
- [Mockups giao diện](mockups/)

## Phát triển trong tương lai

- Tích hợp backend thực với MongoDB
- Hệ thống thanh toán trực tuyến
- Tích hợp video call cho buổi học trực tuyến
- Ứng dụng di động (iOS/Android)
- Hệ thống quản lý học tập (LMS)
- Tích hợp AI để cá nhân hóa trải nghiệm học tập

## Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp! Vui lòng đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm chi tiết.

## Giấy phép

Dự án này được cấp phép theo [MIT License](LICENSE).

## Liên hệ

Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ chúng tôi tại [example@educonnect.com](mailto:example@educonnect.com).
