// Form types for user creation/editing
export type UserFormProps = {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export type UserFormData = {
  accountNumber: string;
  name: string;
  currency: string;
  type: string;
} 

// Bank information type
export type Bank = {
  cardNumber: ReactNode;
  cardExpire: ReactNode;
  iban: string;
  currency: string;
}

// Basic user information
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  accountNumber: string;
  currency: string;
  type: string;
  phone: string;
  age: number;
  gender: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
};

// API response for users list
export type UsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// Props for the UserTableRow component
export type UserTableRowProps = {
  user: User;
  index: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

// Props for the TableHeader component
export type TableHeaderProps = {
  onSearch: (value: string) => void;
  onAddClick: () => void;
  isRTL: boolean;
}

// Props for the TablePagination component
export type TablePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  translations: {
    of: string;
    page: string;
    firstPage: string;
    lastPage: string;
  };
}

// Configuration for API endpoints
export type ApiEndpoints = {
  users: {
    list: (limit: number, skip: number) => string;
    get: (id: number) => string;
    update: (id: number) => string;
    delete: (id: number) => string;
    create: () => string;
  };
}

// Props for the LanguageSwitcher component
export type LanguageSwitcherProps = {
  className?: string;
}

// Props for the EditPage component
export type EditPageProps = {
  params: {
    id: string;
    locale: string;
  };
}

// Props for the CreatePage component
export type CreatePageProps = {
  params: {
    locale: string;
  };
}

// Props for the HomePage component
export type HomePageProps = {
  params: {
    locale: string;
  };
}

// Props for the RootLayout component
export type RootLayoutProps = {
  children: ReactNode;
};

export type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export type ApiResponse<T> = {
  data?: T;
  status: number;
  message?: string;
}
export type ColumnConfig = {
  key: keyof User | 'actions' | 'name';
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (user: User) => React.ReactNode;
};

export type FormFieldProps = {
  label: string;
  name: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select';
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
};
