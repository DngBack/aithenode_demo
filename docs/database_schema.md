# Thiết kế cơ sở dữ liệu - EduConnect

## Tổng quan

EduConnect sử dụng MongoDB (NoSQL) làm cơ sở dữ liệu chính để đảm bảo tính linh hoạt và khả năng mở rộng. Thiết kế này cho phép lưu trữ và truy xuất hiệu quả các thông tin liên quan đến người dùng, buổi học, thanh toán và tương tác cộng đồng.

## Collections

### 1. Users
Lưu trữ thông tin cơ bản của tất cả người dùng (cả học viên và giáo viên).

```javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  fullName: String,
  avatar: String (URL),
  role: String (enum: "student", "teacher", "admin"),
  dateOfBirth: Date,
  gender: String,
  country: String,
  language: [String],
  timezone: String,
  phoneNumber: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  status: String (enum: "active", "inactive", "suspended"),
  settings: {
    notifications: {
      email: Boolean,
      sms: Boolean,
      push: Boolean
    },
    privacy: {
      profileVisibility: String (enum: "public", "registered", "private")
    }
  }
}
```

### 2. StudentProfiles
Thông tin chi tiết về học viên, liên kết với Users collection.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  bio: String,
  learningGoals: [String],
  interests: [String],
  educationLevel: String,
  preferredSubjects: [String],
  preferredLearningStyle: [String],
  savedTeachers: [ObjectId] (ref: TeacherProfiles),
  completedLessons: Number,
  totalLearningHours: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. TeacherProfiles
Thông tin chi tiết về giáo viên, liên kết với Users collection.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  bio: String,
  introduction: String,
  video: String (URL),
  teachingExperience: String,
  education: [
    {
      institution: String,
      degree: String,
      field: String,
      from: Date,
      to: Date,
      current: Boolean
    }
  ],
  certifications: [
    {
      name: String,
      issuer: String,
      date: Date,
      expiryDate: Date,
      verificationURL: String
    }
  ],
  teachingStyle: String,
  subjects: [ObjectId] (ref: Subjects),
  availability: [
    {
      dayOfWeek: Number (0-6),
      startTime: String (HH:MM),
      endTime: String (HH:MM),
      isRecurring: Boolean
    }
  ],
  hourlyRate: {
    amount: Number,
    currency: String
  },
  rating: Number,
  reviewCount: Number,
  isVerified: Boolean,
  verificationDocuments: [String] (URLs),
  featuredTeacher: Boolean,
  badges: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Subjects
Danh sách các môn học được cung cấp trên nền tảng.

```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  category: ObjectId (ref: Categories),
  icon: String (URL),
  popularityScore: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. Categories
Phân loại các môn học.

```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  icon: String (URL),
  parentCategory: ObjectId (ref: Categories),
  createdAt: Date,
  updatedAt: Date
}
```

### 6. Lessons
Thông tin về các buổi học cá nhân.

```javascript
{
  _id: ObjectId,
  teacherId: ObjectId (ref: TeacherProfiles),
  studentId: ObjectId (ref: StudentProfiles),
  subject: ObjectId (ref: Subjects),
  startTime: Date,
  endTime: Date,
  duration: Number (minutes),
  status: String (enum: "scheduled", "completed", "cancelled", "no-show"),
  price: {
    amount: Number,
    currency: String
  },
  meetingLink: String (URL),
  notes: {
    teacher: String,
    student: String
  },
  materials: [
    {
      name: String,
      type: String,
      url: String
    }
  ],
  recording: String (URL),
  feedback: {
    fromStudent: {
      rating: Number,
      comment: String,
      submittedAt: Date
    },
    fromTeacher: {
      rating: Number,
      comment: String,
      submittedAt: Date
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 7. GroupClasses
Thông tin về các lớp học nhóm.

```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  teacherId: ObjectId (ref: TeacherProfiles),
  subject: ObjectId (ref: Subjects),
  level: String (enum: "beginner", "intermediate", "advanced"),
  capacity: Number,
  enrolledStudents: [ObjectId] (ref: StudentProfiles),
  startDate: Date,
  endDate: Date,
  schedule: [
    {
      dayOfWeek: Number (0-6),
      startTime: String (HH:MM),
      endTime: String (HH:MM)
    }
  ],
  totalSessions: Number,
  price: {
    amount: Number,
    currency: String
  },
  meetingLink: String (URL),
  materials: [
    {
      name: String,
      type: String,
      url: String
    }
  ],
  status: String (enum: "upcoming", "ongoing", "completed", "cancelled"),
  createdAt: Date,
  updatedAt: Date
}
```

### 8. Bookings
Đặt lịch học với giáo viên.

```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: StudentProfiles),
  teacherId: ObjectId (ref: TeacherProfiles),
  lessonId: ObjectId (ref: Lessons),
  subject: ObjectId (ref: Subjects),
  requestedTime: [
    {
      date: Date,
      startTime: String (HH:MM),
      endTime: String (HH:MM)
    }
  ],
  confirmedTime: {
    date: Date,
    startTime: String (HH:MM),
    endTime: String (HH:MM)
  },
  duration: Number (minutes),
  status: String (enum: "pending", "confirmed", "rejected", "cancelled"),
  message: String,
  price: {
    amount: Number,
    currency: String
  },
  paymentId: ObjectId (ref: Payments),
  createdAt: Date,
  updatedAt: Date
}
```

### 9. Payments
Thông tin thanh toán.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  bookingId: ObjectId (ref: Bookings),
  amount: Number,
  currency: String,
  method: String (enum: "credit_card", "paypal", "bank_transfer", "wallet"),
  status: String (enum: "pending", "completed", "failed", "refunded"),
  transactionId: String,
  paymentDetails: {
    cardLast4: String,
    expiryDate: String,
    billingAddress: String
  },
  invoice: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

### 10. CommunityPosts
Bài đăng trong cộng đồng học tập.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  title: String,
  content: String,
  attachments: [
    {
      name: String,
      type: String,
      url: String
    }
  ],
  category: String,
  tags: [String],
  likes: Number,
  views: Number,
  comments: [
    {
      userId: ObjectId (ref: Users),
      content: String,
      createdAt: Date,
      updatedAt: Date
    }
  ],
  status: String (enum: "published", "draft", "archived"),
  createdAt: Date,
  updatedAt: Date
}
```

### 11. Notifications
Thông báo cho người dùng.

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  type: String (enum: "lesson_reminder", "booking_confirmation", "payment", "system"),
  title: String,
  message: String,
  relatedId: ObjectId,
  relatedType: String,
  isRead: Boolean,
  createdAt: Date
}
```

### 12. Messages
Tin nhắn giữa người dùng.

```javascript
{
  _id: ObjectId,
  conversationId: ObjectId (ref: Conversations),
  senderId: ObjectId (ref: Users),
  receiverId: ObjectId (ref: Users),
  content: String,
  attachments: [
    {
      name: String,
      type: String,
      url: String
    }
  ],
  isRead: Boolean,
  createdAt: Date
}
```

### 13. Conversations
Cuộc hội thoại giữa người dùng.

```javascript
{
  _id: ObjectId,
  participants: [ObjectId] (ref: Users),
  lastMessage: {
    content: String,
    senderId: ObjectId (ref: Users),
    createdAt: Date
  },
  unreadCount: {
    userId: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Quan hệ giữa các Collections

1. **Users** là collection trung tâm, liên kết với:
   - StudentProfiles (1:1)
   - TeacherProfiles (1:1)
   - Payments (1:n)
   - Notifications (1:n)
   - Messages (1:n)
   - CommunityPosts (1:n)

2. **TeacherProfiles** liên kết với:
   - Subjects (n:n)
   - Lessons (1:n)
   - GroupClasses (1:n)
   - Bookings (1:n)

3. **StudentProfiles** liên kết với:
   - Lessons (1:n)
   - GroupClasses (n:n)
   - Bookings (1:n)

4. **Subjects** liên kết với:
   - Categories (n:1)
   - Lessons (1:n)
   - GroupClasses (1:n)

5. **Bookings** liên kết với:
   - Lessons (1:1)
   - Payments (1:1)

## Chỉ mục (Indexes)

Để tối ưu hiệu suất truy vấn, các chỉ mục sau nên được tạo:

1. Users: email (unique), role
2. TeacherProfiles: userId (unique), subjects, rating
3. StudentProfiles: userId (unique)
4. Subjects: slug (unique), category
5. Lessons: teacherId, studentId, startTime, status
6. GroupClasses: teacherId, subject, startDate, status
7. Bookings: studentId, teacherId, status
8. Payments: userId, bookingId, status
9. CommunityPosts: userId, category, tags
10. Messages: conversationId, senderId, receiverId
11. Notifications: userId, isRead

## Bảo mật dữ liệu

1. Mật khẩu người dùng phải được mã hóa (hashed) trước khi lưu trữ
2. Thông tin thanh toán nhạy cảm nên được mã hóa
3. Quyền truy cập dữ liệu nên được kiểm soát chặt chẽ theo vai trò người dùng
4. Backup dữ liệu thường xuyên và có kế hoạch khôi phục

## Mở rộng trong tương lai

1. Thêm collection LearningPaths cho các lộ trình học tập
2. Thêm collection Achievements cho hệ thống gamification
3. Thêm collection Analytics để theo dõi hành vi người dùng
4. Tích hợp với hệ thống LMS (Learning Management System)
