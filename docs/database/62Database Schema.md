# 1 Entities

## 1.1 User

### 1.1.1 Name

User

### 1.1.2 Description

Represents system users, linking to their authentication identity (e.g., AWS Cognito user) and personal data. Based on REQ-1-004 and REQ-1-058.

### 1.1.3 Attributes

#### 1.1.3.1 Guid

##### 1.1.3.1.1 Name

userId

##### 1.1.3.1.2 Type

🔹 Guid

##### 1.1.3.1.3 Is Required

✅ Yes

##### 1.1.3.1.4 Is Primary Key

✅ Yes

##### 1.1.3.1.5 Is Unique

✅ Yes

##### 1.1.3.1.6 Index Type

UniqueIndex

##### 1.1.3.1.7 Size

0

##### 1.1.3.1.8 Constraints

*No items available*

##### 1.1.3.1.9 Default Value



##### 1.1.3.1.10 Is Foreign Key

❌ No

##### 1.1.3.1.11 Precision

0

##### 1.1.3.1.12 Scale

0

#### 1.1.3.2.0 VARCHAR

##### 1.1.3.2.1 Name

authProviderId

##### 1.1.3.2.2 Type

🔹 VARCHAR

##### 1.1.3.2.3 Is Required

✅ Yes

##### 1.1.3.2.4 Is Primary Key

❌ No

##### 1.1.3.2.5 Is Unique

✅ Yes

##### 1.1.3.2.6 Index Type

UniqueIndex

##### 1.1.3.2.7 Size

255

##### 1.1.3.2.8 Constraints

*No items available*

##### 1.1.3.2.9 Default Value



##### 1.1.3.2.10 Is Foreign Key

❌ No

##### 1.1.3.2.11 Precision

0

##### 1.1.3.2.12 Scale

0

#### 1.1.3.3.0 VARCHAR

##### 1.1.3.3.1 Name

email

##### 1.1.3.3.2 Type

🔹 VARCHAR

##### 1.1.3.3.3 Is Required

✅ Yes

##### 1.1.3.3.4 Is Primary Key

❌ No

##### 1.1.3.3.5 Is Unique

✅ Yes

##### 1.1.3.3.6 Index Type

UniqueIndex

##### 1.1.3.3.7 Size

255

##### 1.1.3.3.8 Constraints

- EMAIL_FORMAT

##### 1.1.3.3.9 Default Value



##### 1.1.3.3.10 Is Foreign Key

❌ No

##### 1.1.3.3.11 Precision

0

##### 1.1.3.3.12 Scale

0

#### 1.1.3.4.0 DateTime

##### 1.1.3.4.1 Name

createdAt

##### 1.1.3.4.2 Type

🔹 DateTime

##### 1.1.3.4.3 Is Required

✅ Yes

##### 1.1.3.4.4 Is Primary Key

❌ No

##### 1.1.3.4.5 Is Unique

❌ No

##### 1.1.3.4.6 Index Type

Index

##### 1.1.3.4.7 Size

0

##### 1.1.3.4.8 Constraints

*No items available*

##### 1.1.3.4.9 Default Value

CURRENT_TIMESTAMP

##### 1.1.3.4.10 Is Foreign Key

❌ No

##### 1.1.3.4.11 Precision

0

##### 1.1.3.4.12 Scale

0

#### 1.1.3.5.0 DateTime

##### 1.1.3.5.1 Name

updatedAt

##### 1.1.3.5.2 Type

🔹 DateTime

##### 1.1.3.5.3 Is Required

✅ Yes

##### 1.1.3.5.4 Is Primary Key

❌ No

##### 1.1.3.5.5 Is Unique

❌ No

##### 1.1.3.5.6 Index Type

None

##### 1.1.3.5.7 Size

0

##### 1.1.3.5.8 Constraints

*No items available*

##### 1.1.3.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.1.3.5.10 Is Foreign Key

❌ No

##### 1.1.3.5.11 Precision

0

##### 1.1.3.5.12 Scale

0

### 1.1.4.0.0 Primary Keys

- userId

### 1.1.5.0.0 Unique Constraints

#### 1.1.5.1.0 UC_User_AuthProviderId

##### 1.1.5.1.1 Name

UC_User_AuthProviderId

##### 1.1.5.1.2 Columns

- authProviderId

#### 1.1.5.2.0 UC_User_Email

##### 1.1.5.2.1 Name

UC_User_Email

##### 1.1.5.2.2 Columns

- email

### 1.1.6.0.0 Indexes

#### 1.1.6.1.0 BTree

##### 1.1.6.1.1 Name

IX_User_CreatedAt

##### 1.1.6.1.2 Columns

- createdAt

##### 1.1.6.1.3 Type

🔹 BTree

#### 1.1.6.2.0 BTree

##### 1.1.6.2.1 Name

IX_User_Email_AuthProviderId

##### 1.1.6.2.2 Columns

- email
- authProviderId

##### 1.1.6.2.3 Type

🔹 BTree

### 1.1.7.0.0 Caching Strategy

| Property | Value |
|----------|-------|
| Provider | Redis |
| Key | userId |
| Strategy | Read-Through/Write-Around |
| Scope | UserProfileData |
| Description | Cache user profile data to reduce database load fr... |

## 1.2.0.0.0 CustomMode

### 1.2.1.0.0 Name

CustomMode

### 1.2.2.0.0 Description

Stores user-defined calculation modes, including their name, description, and full definition as a JSON object. Based on REQ-1-003 and REQ-1-059.

### 1.2.3.0.0 Attributes

#### 1.2.3.1.0 Guid

##### 1.2.3.1.1 Name

customModeId

##### 1.2.3.1.2 Type

🔹 Guid

##### 1.2.3.1.3 Is Required

✅ Yes

##### 1.2.3.1.4 Is Primary Key

✅ Yes

##### 1.2.3.1.5 Is Unique

✅ Yes

##### 1.2.3.1.6 Index Type

UniqueIndex

##### 1.2.3.1.7 Size

0

##### 1.2.3.1.8 Constraints

*No items available*

##### 1.2.3.1.9 Default Value



##### 1.2.3.1.10 Is Foreign Key

❌ No

##### 1.2.3.1.11 Precision

0

##### 1.2.3.1.12 Scale

0

#### 1.2.3.2.0 Guid

##### 1.2.3.2.1 Name

userId

##### 1.2.3.2.2 Type

🔹 Guid

##### 1.2.3.2.3 Is Required

✅ Yes

##### 1.2.3.2.4 Is Primary Key

❌ No

##### 1.2.3.2.5 Is Unique

❌ No

##### 1.2.3.2.6 Index Type

Index

##### 1.2.3.2.7 Size

0

##### 1.2.3.2.8 Constraints

*No items available*

##### 1.2.3.2.9 Default Value



##### 1.2.3.2.10 Is Foreign Key

✅ Yes

##### 1.2.3.2.11 Precision

0

##### 1.2.3.2.12 Scale

0

#### 1.2.3.3.0 VARCHAR

##### 1.2.3.3.1 Name

name

##### 1.2.3.3.2 Type

🔹 VARCHAR

##### 1.2.3.3.3 Is Required

✅ Yes

##### 1.2.3.3.4 Is Primary Key

❌ No

##### 1.2.3.3.5 Is Unique

❌ No

##### 1.2.3.3.6 Index Type

None

##### 1.2.3.3.7 Size

100

##### 1.2.3.3.8 Constraints

*No items available*

##### 1.2.3.3.9 Default Value



##### 1.2.3.3.10 Is Foreign Key

❌ No

##### 1.2.3.3.11 Precision

0

##### 1.2.3.3.12 Scale

0

#### 1.2.3.4.0 TEXT

##### 1.2.3.4.1 Name

description

##### 1.2.3.4.2 Type

🔹 TEXT

##### 1.2.3.4.3 Is Required

❌ No

##### 1.2.3.4.4 Is Primary Key

❌ No

##### 1.2.3.4.5 Is Unique

❌ No

##### 1.2.3.4.6 Index Type

None

##### 1.2.3.4.7 Size

0

##### 1.2.3.4.8 Constraints

*No items available*

##### 1.2.3.4.9 Default Value



##### 1.2.3.4.10 Is Foreign Key

❌ No

##### 1.2.3.4.11 Precision

0

##### 1.2.3.4.12 Scale

0

#### 1.2.3.5.0 JSONB

##### 1.2.3.5.1 Name

definition

##### 1.2.3.5.2 Type

🔹 JSONB

##### 1.2.3.5.3 Is Required

✅ Yes

##### 1.2.3.5.4 Is Primary Key

❌ No

##### 1.2.3.5.5 Is Unique

❌ No

##### 1.2.3.5.6 Index Type

None

##### 1.2.3.5.7 Size

0

##### 1.2.3.5.8 Constraints

*No items available*

##### 1.2.3.5.9 Default Value



##### 1.2.3.5.10 Is Foreign Key

❌ No

##### 1.2.3.5.11 Precision

0

##### 1.2.3.5.12 Scale

0

#### 1.2.3.6.0 DateTime

##### 1.2.3.6.1 Name

createdAt

##### 1.2.3.6.2 Type

🔹 DateTime

##### 1.2.3.6.3 Is Required

✅ Yes

##### 1.2.3.6.4 Is Primary Key

❌ No

##### 1.2.3.6.5 Is Unique

❌ No

##### 1.2.3.6.6 Index Type

Index

##### 1.2.3.6.7 Size

0

##### 1.2.3.6.8 Constraints

*No items available*

##### 1.2.3.6.9 Default Value

CURRENT_TIMESTAMP

##### 1.2.3.6.10 Is Foreign Key

❌ No

##### 1.2.3.6.11 Precision

0

##### 1.2.3.6.12 Scale

0

#### 1.2.3.7.0 DateTime

##### 1.2.3.7.1 Name

updatedAt

##### 1.2.3.7.2 Type

🔹 DateTime

##### 1.2.3.7.3 Is Required

✅ Yes

##### 1.2.3.7.4 Is Primary Key

❌ No

##### 1.2.3.7.5 Is Unique

❌ No

##### 1.2.3.7.6 Index Type

None

##### 1.2.3.7.7 Size

0

##### 1.2.3.7.8 Constraints

*No items available*

##### 1.2.3.7.9 Default Value

CURRENT_TIMESTAMP

##### 1.2.3.7.10 Is Foreign Key

❌ No

##### 1.2.3.7.11 Precision

0

##### 1.2.3.7.12 Scale

0

### 1.2.4.0.0 Primary Keys

- customModeId

### 1.2.5.0.0 Unique Constraints

- {'name': 'UC_CustomMode_User_Name', 'columns': ['userId', 'name']}

### 1.2.6.0.0 Indexes

#### 1.2.6.1.0 BTree

##### 1.2.6.1.1 Name

IX_CustomMode_User

##### 1.2.6.1.2 Columns

- userId

##### 1.2.6.1.3 Type

🔹 BTree

#### 1.2.6.2.0 GIN

##### 1.2.6.2.1 Name

idx_gin_custommode_definition

##### 1.2.6.2.2 Columns

- definition

##### 1.2.6.2.3 Type

🔹 GIN

### 1.2.7.0.0 Caching Strategy

| Property | Value |
|----------|-------|
| Provider | Redis |
| Key | userId |
| Strategy | Write-Through/Write-Invalidate |
| Scope | FullObjectSet |
| Description | Cache the complete set of a user's custom modes up... |

## 1.3.0.0.0 UserVariable

### 1.3.1.0.0 Name

UserVariable

### 1.3.2.0.0 Description

Stores named variables created by users for use in calculations. A unique constraint exists on the combination of userId and name. Based on REQ-1-024 and REQ-1-060.

### 1.3.3.0.0 Attributes

#### 1.3.3.1.0 Guid

##### 1.3.3.1.1 Name

userVariableId

##### 1.3.3.1.2 Type

🔹 Guid

##### 1.3.3.1.3 Is Required

✅ Yes

##### 1.3.3.1.4 Is Primary Key

✅ Yes

##### 1.3.3.1.5 Is Unique

✅ Yes

##### 1.3.3.1.6 Index Type

UniqueIndex

##### 1.3.3.1.7 Size

0

##### 1.3.3.1.8 Constraints

*No items available*

##### 1.3.3.1.9 Default Value



##### 1.3.3.1.10 Is Foreign Key

❌ No

##### 1.3.3.1.11 Precision

0

##### 1.3.3.1.12 Scale

0

#### 1.3.3.2.0 Guid

##### 1.3.3.2.1 Name

userId

##### 1.3.3.2.2 Type

🔹 Guid

##### 1.3.3.2.3 Is Required

✅ Yes

##### 1.3.3.2.4 Is Primary Key

❌ No

##### 1.3.3.2.5 Is Unique

❌ No

##### 1.3.3.2.6 Index Type

Index

##### 1.3.3.2.7 Size

0

##### 1.3.3.2.8 Constraints

*No items available*

##### 1.3.3.2.9 Default Value



##### 1.3.3.2.10 Is Foreign Key

✅ Yes

##### 1.3.3.2.11 Precision

0

##### 1.3.3.2.12 Scale

0

#### 1.3.3.3.0 VARCHAR

##### 1.3.3.3.1 Name

name

##### 1.3.3.3.2 Type

🔹 VARCHAR

##### 1.3.3.3.3 Is Required

✅ Yes

##### 1.3.3.3.4 Is Primary Key

❌ No

##### 1.3.3.3.5 Is Unique

❌ No

##### 1.3.3.3.6 Index Type

None

##### 1.3.3.3.7 Size

50

##### 1.3.3.3.8 Constraints

*No items available*

##### 1.3.3.3.9 Default Value



##### 1.3.3.3.10 Is Foreign Key

❌ No

##### 1.3.3.3.11 Precision

0

##### 1.3.3.3.12 Scale

0

#### 1.3.3.4.0 VARCHAR

##### 1.3.3.4.1 Name

value

##### 1.3.3.4.2 Type

🔹 VARCHAR

##### 1.3.3.4.3 Is Required

✅ Yes

##### 1.3.3.4.4 Is Primary Key

❌ No

##### 1.3.3.4.5 Is Unique

❌ No

##### 1.3.3.4.6 Index Type

None

##### 1.3.3.4.7 Size

255

##### 1.3.3.4.8 Constraints

*No items available*

##### 1.3.3.4.9 Default Value



##### 1.3.3.4.10 Is Foreign Key

❌ No

##### 1.3.3.4.11 Precision

0

##### 1.3.3.4.12 Scale

0

#### 1.3.3.5.0 VARCHAR

##### 1.3.3.5.1 Name

valueType

##### 1.3.3.5.2 Type

🔹 VARCHAR

##### 1.3.3.5.3 Is Required

✅ Yes

##### 1.3.3.5.4 Is Primary Key

❌ No

##### 1.3.3.5.5 Is Unique

❌ No

##### 1.3.3.5.6 Index Type

None

##### 1.3.3.5.7 Size

20

##### 1.3.3.5.8 Constraints

- CHECK (valueType IN ('string', 'number', 'boolean'))

##### 1.3.3.5.9 Default Value

'string'

##### 1.3.3.5.10 Is Foreign Key

❌ No

##### 1.3.3.5.11 Precision

0

##### 1.3.3.5.12 Scale

0

#### 1.3.3.6.0 DateTime

##### 1.3.3.6.1 Name

createdAt

##### 1.3.3.6.2 Type

🔹 DateTime

##### 1.3.3.6.3 Is Required

✅ Yes

##### 1.3.3.6.4 Is Primary Key

❌ No

##### 1.3.3.6.5 Is Unique

❌ No

##### 1.3.3.6.6 Index Type

Index

##### 1.3.3.6.7 Size

0

##### 1.3.3.6.8 Constraints

*No items available*

##### 1.3.3.6.9 Default Value

CURRENT_TIMESTAMP

##### 1.3.3.6.10 Is Foreign Key

❌ No

##### 1.3.3.6.11 Precision

0

##### 1.3.3.6.12 Scale

0

#### 1.3.3.7.0 DateTime

##### 1.3.3.7.1 Name

updatedAt

##### 1.3.3.7.2 Type

🔹 DateTime

##### 1.3.3.7.3 Is Required

✅ Yes

##### 1.3.3.7.4 Is Primary Key

❌ No

##### 1.3.3.7.5 Is Unique

❌ No

##### 1.3.3.7.6 Index Type

None

##### 1.3.3.7.7 Size

0

##### 1.3.3.7.8 Constraints

*No items available*

##### 1.3.3.7.9 Default Value

CURRENT_TIMESTAMP

##### 1.3.3.7.10 Is Foreign Key

❌ No

##### 1.3.3.7.11 Precision

0

##### 1.3.3.7.12 Scale

0

### 1.3.4.0.0 Primary Keys

- userVariableId

### 1.3.5.0.0 Unique Constraints

- {'name': 'UC_UserVariable_User_Name', 'columns': ['userId', 'name']}

### 1.3.6.0.0 Indexes

- {'name': 'IX_UserVariable_User', 'columns': ['userId'], 'type': 'BTree'}

### 1.3.7.0.0 Caching Strategy

| Property | Value |
|----------|-------|
| Provider | Redis |
| Key | userId |
| Strategy | Write-Through/Write-Invalidate |
| Scope | FullObjectSet |
| Description | Cache the complete set of a user's variables upon ... |

## 1.4.0.0.0 CalculationHistory

### 1.4.1.0.0 Name

CalculationHistory

### 1.4.2.0.0 Description

Logs a user's past calculations (expression and result) for recall and reuse. Based on REQ-1-022 and REQ-1-061.

### 1.4.3.0.0 Attributes

#### 1.4.3.1.0 Guid

##### 1.4.3.1.1 Name

calculationHistoryId

##### 1.4.3.1.2 Type

🔹 Guid

##### 1.4.3.1.3 Is Required

✅ Yes

##### 1.4.3.1.4 Is Primary Key

✅ Yes

##### 1.4.3.1.5 Is Unique

✅ Yes

##### 1.4.3.1.6 Index Type

UniqueIndex

##### 1.4.3.1.7 Size

0

##### 1.4.3.1.8 Constraints

*No items available*

##### 1.4.3.1.9 Default Value



##### 1.4.3.1.10 Is Foreign Key

❌ No

##### 1.4.3.1.11 Precision

0

##### 1.4.3.1.12 Scale

0

#### 1.4.3.2.0 Guid

##### 1.4.3.2.1 Name

userId

##### 1.4.3.2.2 Type

🔹 Guid

##### 1.4.3.2.3 Is Required

✅ Yes

##### 1.4.3.2.4 Is Primary Key

❌ No

##### 1.4.3.2.5 Is Unique

❌ No

##### 1.4.3.2.6 Index Type

Index

##### 1.4.3.2.7 Size

0

##### 1.4.3.2.8 Constraints

*No items available*

##### 1.4.3.2.9 Default Value



##### 1.4.3.2.10 Is Foreign Key

✅ Yes

##### 1.4.3.2.11 Precision

0

##### 1.4.3.2.12 Scale

0

#### 1.4.3.3.0 TEXT

##### 1.4.3.3.1 Name

expression

##### 1.4.3.3.2 Type

🔹 TEXT

##### 1.4.3.3.3 Is Required

✅ Yes

##### 1.4.3.3.4 Is Primary Key

❌ No

##### 1.4.3.3.5 Is Unique

❌ No

##### 1.4.3.3.6 Index Type

None

##### 1.4.3.3.7 Size

0

##### 1.4.3.3.8 Constraints

*No items available*

##### 1.4.3.3.9 Default Value



##### 1.4.3.3.10 Is Foreign Key

❌ No

##### 1.4.3.3.11 Precision

0

##### 1.4.3.3.12 Scale

0

#### 1.4.3.4.0 VARCHAR

##### 1.4.3.4.1 Name

result

##### 1.4.3.4.2 Type

🔹 VARCHAR

##### 1.4.3.4.3 Is Required

✅ Yes

##### 1.4.3.4.4 Is Primary Key

❌ No

##### 1.4.3.4.5 Is Unique

❌ No

##### 1.4.3.4.6 Index Type

None

##### 1.4.3.4.7 Size

255

##### 1.4.3.4.8 Constraints

*No items available*

##### 1.4.3.4.9 Default Value



##### 1.4.3.4.10 Is Foreign Key

❌ No

##### 1.4.3.4.11 Precision

0

##### 1.4.3.4.12 Scale

0

#### 1.4.3.5.0 DateTime

##### 1.4.3.5.1 Name

createdAt

##### 1.4.3.5.2 Type

🔹 DateTime

##### 1.4.3.5.3 Is Required

✅ Yes

##### 1.4.3.5.4 Is Primary Key

❌ No

##### 1.4.3.5.5 Is Unique

❌ No

##### 1.4.3.5.6 Index Type

Index

##### 1.4.3.5.7 Size

0

##### 1.4.3.5.8 Constraints

*No items available*

##### 1.4.3.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.4.3.5.10 Is Foreign Key

❌ No

##### 1.4.3.5.11 Precision

0

##### 1.4.3.5.12 Scale

0

### 1.4.4.0.0 Primary Keys

- calculationHistoryId

### 1.4.5.0.0 Unique Constraints

*No items available*

### 1.4.6.0.0 Indexes

- {'name': 'IX_CalculationHistory_User_CreatedAt_Desc', 'columns': ['userId', 'createdAt DESC'], 'type': 'BTree'}

### 1.4.7.0.0 Partitioning

| Property | Value |
|----------|-------|
| Type | Range |
| Column | createdAt |
| Strategy | Monthly |
| Description | Partition the table by month on the createdAt colu... |

# 2.0.0.0.0 Relations

## 2.1.0.0.0 OneToMany

### 2.1.1.0.0 Name

UserCustomModes

### 2.1.2.0.0 Id

REL_USER_CUSTOMMODE_001

### 2.1.3.0.0 Source Entity

User

### 2.1.4.0.0 Target Entity

CustomMode

### 2.1.5.0.0 Type

🔹 OneToMany

### 2.1.6.0.0 Source Multiplicity

1

### 2.1.7.0.0 Target Multiplicity

0..*

### 2.1.8.0.0 Cascade Delete

✅ Yes

### 2.1.9.0.0 Is Identifying

✅ Yes

### 2.1.10.0.0 On Delete

Cascade

### 2.1.11.0.0 On Update

Cascade

### 2.1.12.0.0 Join Table

#### 2.1.12.1.0 Name



#### 2.1.12.2.0 Columns

*No items available*

## 2.2.0.0.0 OneToMany

### 2.2.1.0.0 Name

UserUserVariables

### 2.2.2.0.0 Id

REL_USER_USERVARIABLE_001

### 2.2.3.0.0 Source Entity

User

### 2.2.4.0.0 Target Entity

UserVariable

### 2.2.5.0.0 Type

🔹 OneToMany

### 2.2.6.0.0 Source Multiplicity

1

### 2.2.7.0.0 Target Multiplicity

0..*

### 2.2.8.0.0 Cascade Delete

✅ Yes

### 2.2.9.0.0 Is Identifying

✅ Yes

### 2.2.10.0.0 On Delete

Cascade

### 2.2.11.0.0 On Update

Cascade

### 2.2.12.0.0 Join Table

#### 2.2.12.1.0 Name



#### 2.2.12.2.0 Columns

*No items available*

## 2.3.0.0.0 OneToMany

### 2.3.1.0.0 Name

UserCalculationHistories

### 2.3.2.0.0 Id

REL_USER_CALCHISTORY_001

### 2.3.3.0.0 Source Entity

User

### 2.3.4.0.0 Target Entity

CalculationHistory

### 2.3.5.0.0 Type

🔹 OneToMany

### 2.3.6.0.0 Source Multiplicity

1

### 2.3.7.0.0 Target Multiplicity

0..*

### 2.3.8.0.0 Cascade Delete

✅ Yes

### 2.3.9.0.0 Is Identifying

✅ Yes

### 2.3.10.0.0 On Delete

Cascade

### 2.3.11.0.0 On Update

Cascade

### 2.3.12.0.0 Join Table

#### 2.3.12.1.0 Name



#### 2.3.12.2.0 Columns

*No items available*

