#LISTADO DE QUERIES PARA PROBAR LA APP

##Mostrar todos los usuarios

[Mostrar Usuarios](http://localhost:3000/api/usuarios)

[Mostrar Transferencias](http://localhost:3000/api/transfer)

[Crear un Usuario](http://localhost:3000/api/usuarios)


```json
{
	"nombre":"Franco",
	"balance":5220
}
```

[Actualizar un Usuario](http://localhost:3000/api/usuarios/1)


```json
{
	"nombre":"Ernesto",
	"balance":2500

}
```


[Eliminar un usuario](http://localhost:3000/api/usuarios/4)


[Crear una transferencia](http://localhost:3000/api/transfer)



```json
{
	"emisor":1,
	"receptor":2,
	"monto":1000
}
```
