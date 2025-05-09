## API Documentation

### Use case: Registrar un socio.

```
POST /members
REQUEST 
{
    name: string
}
RESPONSE
{
    id: int
}
```

### Use case: Retirar un libro
```
POST /loans
REQUEST
{
    memberId: int,
    bookId: int
}
RESPONSE
{
    deadline: datetime
}
```

### Use case: Devolver un libro
```
PATCH /loans
REQUEST
{
    bookId: int
}
RESPONSE
{
    canceledLoans: int,
}
```

### Use case: Listar los prestamos de un socio
```
GET /loan?memberId=member_id&activeLoans=bool
REQUEST
{}
RESPONSE
{
    loans: [
        {
            returnDate: datetime,
            loanDate: datetime,
            deadline: datetime,
            bookTitle: string
        }
    ]
}
```