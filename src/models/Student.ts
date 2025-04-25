import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  interests: [{
    type: String,
  }],
  learningGoals: [{
    type: String,
  }],
  educationLevel: {
    type: String,
    enum: ['elementary', 'middle', 'high', 'university', 'adult'],
  },
  preferredSubjects: [{
    type: String,
  }],
  preferredLearningStyle: [{
    type: String,
    enum: ['visual', 'auditory', 'reading', 'kinesthetic'],
  }],
  timezone: {
    type: String,
    default: 'UTC',
  },
  language: {
    type: String,
    default: 'en',
  },
  phoneNumber: {
    type: String,
  },
  settings: {
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
      push: {
        type: Boolean,
        default: true,
      },
      classReminders: {
        type: Boolean,
        default: true,
      },
      newMessages: {
        type: Boolean,
        default: true,
      },
      promotions: {
        type: Boolean,
        default: false,
      },
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'registered', 'private'],
        default: 'public',
      },
      showProgress: {
        type: Boolean,
        default: true,
      },
      showReviews: {
        type: Boolean,
        default: true,
      },
    },
    studyPreferences: {
      preferredClassDuration: {
        type: Number,
        default: 60, // in minutes
      },
      preferredClassTime: {
        type: String,
        enum: ['morning', 'afternoon', 'evening', 'night'],
        default: 'afternoon',
      },
      maxClassesPerWeek: {
        type: Number,
        default: 5,
      },
    },
  },
  bookedClasses: [{
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    date: Date,
    startTime: String,
    endTime: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    subject: String,
    notes: String,
    feedback: {
      rating: Number,
      comment: String,
      date: Date,
    },
  }],
  progress: {
    completedClasses: {
      type: Number,
      default: 0,
    },
    totalClasses: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    attendanceRate: {
      type: Number,
      default: 0,
    },
    subjectProgress: [{
      subject: String,
      progress: Number,
      lastUpdated: Date,
    }],
  },
  notifications: [{
    title: String,
    message: String,
    type: {
      type: String,
      enum: ['class', 'system', 'payment', 'message'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],
  paymentHistory: [{
    amount: Number,
    date: Date,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
    },
    description: String,
    paymentMethod: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
studentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Student || mongoose.model('Student', studentSchema); 