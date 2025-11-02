# 1 Title

Optimized Relational Database for Calculator Application

# 2 Name

calculator_app_db

# 3 Db Type

- relational

# 4 Db Technology

PostgreSQL

# 5 Entities

## 5.1 User

### 5.1.1 Name

User

### 5.1.2 Description

Represents system users, linking to their AWS Cognito identity. Includes fields for tracking consent to legal policies as per REQ-LGL-001. The 'updatedAt' field should be automatically updated by a database trigger on any row modification to support offline sync conflict resolution (REQ-ENV-001).

### 5.1.3 Attributes

#### 5.1.3.1 UUID

##### 5.1.3.1.1 Name

id

##### 5.1.3.1.2 Type

🔹 UUID

##### 5.1.3.1.3 Is Required

✅ Yes

##### 5.1.3.1.4 Is Primary Key

✅ Yes

##### 5.1.3.1.5 Size

0

##### 5.1.3.1.6 Is Unique

✅ Yes

##### 5.1.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.1.3.1.8 Precision

0

##### 5.1.3.1.9 Scale

0

##### 5.1.3.1.10 Is Foreign Key

❌ No

#### 5.1.3.2.0 VARCHAR

##### 5.1.3.2.1 Name

authProviderId

##### 5.1.3.2.2 Type

🔹 VARCHAR

##### 5.1.3.2.3 Is Required

✅ Yes

##### 5.1.3.2.4 Is Primary Key

❌ No

##### 5.1.3.2.5 Size

255

##### 5.1.3.2.6 Is Unique

✅ Yes

##### 5.1.3.2.7 Constraints

*No items available*

##### 5.1.3.2.8 Precision

0

##### 5.1.3.2.9 Scale

0

##### 5.1.3.2.10 Is Foreign Key

❌ No

#### 5.1.3.3.0 VARCHAR

##### 5.1.3.3.1 Name

email

##### 5.1.3.3.2 Type

🔹 VARCHAR

##### 5.1.3.3.3 Is Required

✅ Yes

##### 5.1.3.3.4 Is Primary Key

❌ No

##### 5.1.3.3.5 Size

255

##### 5.1.3.3.6 Is Unique

✅ Yes

##### 5.1.3.3.7 Constraints

*No items available*

##### 5.1.3.3.8 Precision

0

##### 5.1.3.3.9 Scale

0

##### 5.1.3.3.10 Is Foreign Key

❌ No

#### 5.1.3.4.0 DateTimeOffset

##### 5.1.3.4.1 Name

termsAcceptedAt

##### 5.1.3.4.2 Type

🔹 DateTimeOffset

##### 5.1.3.4.3 Is Required

❌ No

##### 5.1.3.4.4 Is Primary Key

❌ No

##### 5.1.3.4.5 Size

0

##### 5.1.3.4.6 Is Unique

❌ No

##### 5.1.3.4.7 Constraints

*No items available*

##### 5.1.3.4.8 Precision

0

##### 5.1.3.4.9 Scale

0

##### 5.1.3.4.10 Is Foreign Key

❌ No

#### 5.1.3.5.0 VARCHAR

##### 5.1.3.5.1 Name

privacyPolicyVersionAccepted

##### 5.1.3.5.2 Type

🔹 VARCHAR

##### 5.1.3.5.3 Is Required

❌ No

##### 5.1.3.5.4 Is Primary Key

❌ No

##### 5.1.3.5.5 Size

20

##### 5.1.3.5.6 Is Unique

❌ No

##### 5.1.3.5.7 Constraints

*No items available*

##### 5.1.3.5.8 Precision

0

##### 5.1.3.5.9 Scale

0

##### 5.1.3.5.10 Is Foreign Key

❌ No

#### 5.1.3.6.0 DateTimeOffset

##### 5.1.3.6.1 Name

createdAt

##### 5.1.3.6.2 Type

🔹 DateTimeOffset

##### 5.1.3.6.3 Is Required

✅ Yes

##### 5.1.3.6.4 Is Primary Key

❌ No

##### 5.1.3.6.5 Size

0

##### 5.1.3.6.6 Is Unique

❌ No

##### 5.1.3.6.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.1.3.6.8 Precision

0

##### 5.1.3.6.9 Scale

0

##### 5.1.3.6.10 Is Foreign Key

❌ No

#### 5.1.3.7.0 DateTimeOffset

##### 5.1.3.7.1 Name

updatedAt

##### 5.1.3.7.2 Type

🔹 DateTimeOffset

##### 5.1.3.7.3 Is Required

✅ Yes

##### 5.1.3.7.4 Is Primary Key

❌ No

##### 5.1.3.7.5 Size

0

##### 5.1.3.7.6 Is Unique

❌ No

##### 5.1.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.1.3.7.8 Precision

0

##### 5.1.3.7.9 Scale

0

##### 5.1.3.7.10 Is Foreign Key

❌ No

### 5.1.4.0.0 Primary Keys

- id

### 5.1.5.0.0 Unique Constraints

#### 5.1.5.1.0 uq_user_authProviderId

##### 5.1.5.1.1 Name

uq_user_authProviderId

##### 5.1.5.1.2 Columns

- authProviderId

#### 5.1.5.2.0 uq_user_email

##### 5.1.5.2.1 Name

uq_user_email

##### 5.1.5.2.2 Columns

- email

### 5.1.6.0.0 Indexes

- {'name': 'ix_user_createdAt', 'columns': ['createdAt'], 'type': 'BTree'}

## 5.2.0.0.0 CustomMode

### 5.2.1.0.0 Name

CustomMode

### 5.2.2.0.0 Description

Stores user-defined calculation modes, including their definition as a JSONB object (REQ-DAT-001). The 'updatedAt' field is critical for 'last-write-wins' offline data synchronization (REQ-ENV-001) and should be automatically managed by a database trigger.

### 5.2.3.0.0 Attributes

#### 5.2.3.1.0 UUID

##### 5.2.3.1.1 Name

id

##### 5.2.3.1.2 Type

🔹 UUID

##### 5.2.3.1.3 Is Required

✅ Yes

##### 5.2.3.1.4 Is Primary Key

✅ Yes

##### 5.2.3.1.5 Size

0

##### 5.2.3.1.6 Is Unique

✅ Yes

##### 5.2.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.2.3.1.8 Precision

0

##### 5.2.3.1.9 Scale

0

##### 5.2.3.1.10 Is Foreign Key

❌ No

#### 5.2.3.2.0 UUID

##### 5.2.3.2.1 Name

userId

##### 5.2.3.2.2 Type

🔹 UUID

##### 5.2.3.2.3 Is Required

✅ Yes

##### 5.2.3.2.4 Is Primary Key

❌ No

##### 5.2.3.2.5 Size

0

##### 5.2.3.2.6 Is Unique

❌ No

##### 5.2.3.2.7 Constraints

*No items available*

##### 5.2.3.2.8 Precision

0

##### 5.2.3.2.9 Scale

0

##### 5.2.3.2.10 Is Foreign Key

✅ Yes

#### 5.2.3.3.0 VARCHAR

##### 5.2.3.3.1 Name

name

##### 5.2.3.3.2 Type

🔹 VARCHAR

##### 5.2.3.3.3 Is Required

✅ Yes

##### 5.2.3.3.4 Is Primary Key

❌ No

##### 5.2.3.3.5 Size

100

##### 5.2.3.3.6 Is Unique

❌ No

##### 5.2.3.3.7 Constraints

*No items available*

##### 5.2.3.3.8 Precision

0

##### 5.2.3.3.9 Scale

0

##### 5.2.3.3.10 Is Foreign Key

❌ No

#### 5.2.3.4.0 TEXT

##### 5.2.3.4.1 Name

description

##### 5.2.3.4.2 Type

🔹 TEXT

##### 5.2.3.4.3 Is Required

❌ No

##### 5.2.3.4.4 Is Primary Key

❌ No

##### 5.2.3.4.5 Size

0

##### 5.2.3.4.6 Is Unique

❌ No

##### 5.2.3.4.7 Constraints

*No items available*

##### 5.2.3.4.8 Precision

0

##### 5.2.3.4.9 Scale

0

##### 5.2.3.4.10 Is Foreign Key

❌ No

#### 5.2.3.5.0 JSONB

##### 5.2.3.5.1 Name

definition

##### 5.2.3.5.2 Type

🔹 JSONB

##### 5.2.3.5.3 Is Required

✅ Yes

##### 5.2.3.5.4 Is Primary Key

❌ No

##### 5.2.3.5.5 Size

0

##### 5.2.3.5.6 Is Unique

❌ No

##### 5.2.3.5.7 Constraints

*No items available*

##### 5.2.3.5.8 Precision

0

##### 5.2.3.5.9 Scale

0

##### 5.2.3.5.10 Is Foreign Key

❌ No

#### 5.2.3.6.0 DateTimeOffset

##### 5.2.3.6.1 Name

createdAt

##### 5.2.3.6.2 Type

🔹 DateTimeOffset

##### 5.2.3.6.3 Is Required

✅ Yes

##### 5.2.3.6.4 Is Primary Key

❌ No

##### 5.2.3.6.5 Size

0

##### 5.2.3.6.6 Is Unique

❌ No

##### 5.2.3.6.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.2.3.6.8 Precision

0

##### 5.2.3.6.9 Scale

0

##### 5.2.3.6.10 Is Foreign Key

❌ No

#### 5.2.3.7.0 DateTimeOffset

##### 5.2.3.7.1 Name

updatedAt

##### 5.2.3.7.2 Type

🔹 DateTimeOffset

##### 5.2.3.7.3 Is Required

✅ Yes

##### 5.2.3.7.4 Is Primary Key

❌ No

##### 5.2.3.7.5 Size

0

##### 5.2.3.7.6 Is Unique

❌ No

##### 5.2.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.2.3.7.8 Precision

0

##### 5.2.3.7.9 Scale

0

##### 5.2.3.7.10 Is Foreign Key

❌ No

### 5.2.4.0.0 Primary Keys

- id

### 5.2.5.0.0 Unique Constraints

- {'name': 'uq_customMode_userId_name', 'columns': ['userId', 'name']}

### 5.2.6.0.0 Indexes

#### 5.2.6.1.0 BTree

##### 5.2.6.1.1 Name

ix_customMode_userId

##### 5.2.6.1.2 Columns

- userId

##### 5.2.6.1.3 Type

🔹 BTree

#### 5.2.6.2.0 GIN

##### 5.2.6.2.1 Name

ix_gin_customMode_definition

##### 5.2.6.2.2 Columns

- definition

##### 5.2.6.2.3 Type

🔹 GIN

## 5.3.0.0.0 UserVariable

### 5.3.1.0.0 Name

UserVariable

### 5.3.2.0.0 Description

Stores named variables created by users for calculations (REQ-DAT-001). A unique constraint on (userId, name) prevents duplicates. The 'updatedAt' field is critical for 'last-write-wins' offline data synchronization (REQ-ENV-001) and should be automatically managed by a database trigger.

### 5.3.3.0.0 Attributes

#### 5.3.3.1.0 UUID

##### 5.3.3.1.1 Name

id

##### 5.3.3.1.2 Type

🔹 UUID

##### 5.3.3.1.3 Is Required

✅ Yes

##### 5.3.3.1.4 Is Primary Key

✅ Yes

##### 5.3.3.1.5 Size

0

##### 5.3.3.1.6 Is Unique

✅ Yes

##### 5.3.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.3.3.1.8 Precision

0

##### 5.3.3.1.9 Scale

0

##### 5.3.3.1.10 Is Foreign Key

❌ No

#### 5.3.3.2.0 UUID

##### 5.3.3.2.1 Name

userId

##### 5.3.3.2.2 Type

🔹 UUID

##### 5.3.3.2.3 Is Required

✅ Yes

##### 5.3.3.2.4 Is Primary Key

❌ No

##### 5.3.3.2.5 Size

0

##### 5.3.3.2.6 Is Unique

❌ No

##### 5.3.3.2.7 Constraints

*No items available*

##### 5.3.3.2.8 Precision

0

##### 5.3.3.2.9 Scale

0

##### 5.3.3.2.10 Is Foreign Key

✅ Yes

#### 5.3.3.3.0 VARCHAR

##### 5.3.3.3.1 Name

name

##### 5.3.3.3.2 Type

🔹 VARCHAR

##### 5.3.3.3.3 Is Required

✅ Yes

##### 5.3.3.3.4 Is Primary Key

❌ No

##### 5.3.3.3.5 Size

50

##### 5.3.3.3.6 Is Unique

❌ No

##### 5.3.3.3.7 Constraints

*No items available*

##### 5.3.3.3.8 Precision

0

##### 5.3.3.3.9 Scale

0

##### 5.3.3.3.10 Is Foreign Key

❌ No

#### 5.3.3.4.0 VARCHAR

##### 5.3.3.4.1 Name

value

##### 5.3.3.4.2 Type

🔹 VARCHAR

##### 5.3.3.4.3 Is Required

✅ Yes

##### 5.3.3.4.4 Is Primary Key

❌ No

##### 5.3.3.4.5 Size

255

##### 5.3.3.4.6 Is Unique

❌ No

##### 5.3.3.4.7 Constraints

*No items available*

##### 5.3.3.4.8 Precision

0

##### 5.3.3.4.9 Scale

0

##### 5.3.3.4.10 Is Foreign Key

❌ No

#### 5.3.3.5.0 VARCHAR

##### 5.3.3.5.1 Name

valueType

##### 5.3.3.5.2 Type

🔹 VARCHAR

##### 5.3.3.5.3 Is Required

✅ Yes

##### 5.3.3.5.4 Is Primary Key

❌ No

##### 5.3.3.5.5 Size

20

##### 5.3.3.5.6 Is Unique

❌ No

##### 5.3.3.5.7 Constraints

- CHECK (valueType IN ('string', 'number', 'boolean'))

##### 5.3.3.5.8 Precision

0

##### 5.3.3.5.9 Scale

0

##### 5.3.3.5.10 Is Foreign Key

❌ No

#### 5.3.3.6.0 DateTimeOffset

##### 5.3.3.6.1 Name

createdAt

##### 5.3.3.6.2 Type

🔹 DateTimeOffset

##### 5.3.3.6.3 Is Required

✅ Yes

##### 5.3.3.6.4 Is Primary Key

❌ No

##### 5.3.3.6.5 Size

0

##### 5.3.3.6.6 Is Unique

❌ No

##### 5.3.3.6.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.3.3.6.8 Precision

0

##### 5.3.3.6.9 Scale

0

##### 5.3.3.6.10 Is Foreign Key

❌ No

#### 5.3.3.7.0 DateTimeOffset

##### 5.3.3.7.1 Name

updatedAt

##### 5.3.3.7.2 Type

🔹 DateTimeOffset

##### 5.3.3.7.3 Is Required

✅ Yes

##### 5.3.3.7.4 Is Primary Key

❌ No

##### 5.3.3.7.5 Size

0

##### 5.3.3.7.6 Is Unique

❌ No

##### 5.3.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.3.3.7.8 Precision

0

##### 5.3.3.7.9 Scale

0

##### 5.3.3.7.10 Is Foreign Key

❌ No

### 5.3.4.0.0 Primary Keys

- id

### 5.3.5.0.0 Unique Constraints

- {'name': 'uq_userVariable_userId_name', 'columns': ['userId', 'name']}

### 5.3.6.0.0 Indexes

- {'name': 'ix_userVariable_userId', 'columns': ['userId'], 'type': 'BTree'}

## 5.4.0.0.0 CalculationHistory

### 5.4.1.0.0 Name

CalculationHistory

### 5.4.2.0.0 Description

Logs a user's calculation history (REQ-DAT-001). This table is designed to be partitioned by 'createdAt' date range (e.g., monthly) to manage data volume and improve query performance for historical lookups.

### 5.4.3.0.0 Attributes

#### 5.4.3.1.0 UUID

##### 5.4.3.1.1 Name

id

##### 5.4.3.1.2 Type

🔹 UUID

##### 5.4.3.1.3 Is Required

✅ Yes

##### 5.4.3.1.4 Is Primary Key

✅ Yes

##### 5.4.3.1.5 Size

0

##### 5.4.3.1.6 Is Unique

✅ Yes

##### 5.4.3.1.7 Constraints

- DEFAULT gen_random_uuid()

##### 5.4.3.1.8 Precision

0

##### 5.4.3.1.9 Scale

0

##### 5.4.3.1.10 Is Foreign Key

❌ No

#### 5.4.3.2.0 UUID

##### 5.4.3.2.1 Name

userId

##### 5.4.3.2.2 Type

🔹 UUID

##### 5.4.3.2.3 Is Required

✅ Yes

##### 5.4.3.2.4 Is Primary Key

❌ No

##### 5.4.3.2.5 Size

0

##### 5.4.3.2.6 Is Unique

❌ No

##### 5.4.3.2.7 Constraints

*No items available*

##### 5.4.3.2.8 Precision

0

##### 5.4.3.2.9 Scale

0

##### 5.4.3.2.10 Is Foreign Key

✅ Yes

#### 5.4.3.3.0 TEXT

##### 5.4.3.3.1 Name

expression

##### 5.4.3.3.2 Type

🔹 TEXT

##### 5.4.3.3.3 Is Required

✅ Yes

##### 5.4.3.3.4 Is Primary Key

❌ No

##### 5.4.3.3.5 Size

0

##### 5.4.3.3.6 Is Unique

❌ No

##### 5.4.3.3.7 Constraints

*No items available*

##### 5.4.3.3.8 Precision

0

##### 5.4.3.3.9 Scale

0

##### 5.4.3.3.10 Is Foreign Key

❌ No

#### 5.4.3.4.0 VARCHAR

##### 5.4.3.4.1 Name

result

##### 5.4.3.4.2 Type

🔹 VARCHAR

##### 5.4.3.4.3 Is Required

✅ Yes

##### 5.4.3.4.4 Is Primary Key

❌ No

##### 5.4.3.4.5 Size

255

##### 5.4.3.4.6 Is Unique

❌ No

##### 5.4.3.4.7 Constraints

*No items available*

##### 5.4.3.4.8 Precision

0

##### 5.4.3.4.9 Scale

0

##### 5.4.3.4.10 Is Foreign Key

❌ No

#### 5.4.3.5.0 DateTimeOffset

##### 5.4.3.5.1 Name

createdAt

##### 5.4.3.5.2 Type

🔹 DateTimeOffset

##### 5.4.3.5.3 Is Required

✅ Yes

##### 5.4.3.5.4 Is Primary Key

❌ No

##### 5.4.3.5.5 Size

0

##### 5.4.3.5.6 Is Unique

❌ No

##### 5.4.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.4.3.5.8 Precision

0

##### 5.4.3.5.9 Scale

0

##### 5.4.3.5.10 Is Foreign Key

❌ No

### 5.4.4.0.0 Primary Keys

- id

### 5.4.5.0.0 Unique Constraints

*No items available*

### 5.4.6.0.0 Indexes

- {'name': 'ix_calculationHistory_userId_createdAt_desc', 'columns': ['userId', 'createdAt DESC'], 'type': 'BTree'}

