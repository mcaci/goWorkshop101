
---
transition: fade-out
layout: two-cols-header
---

# Pointers

</br>

::left::

<v-clicks>

_Basic operations_

Use `*` to declare a pointer and to dereference it

Use `&` to take the address of a variable

`&` can also be used to take the address of a complex struct value

_In addition_

Method can have __pointer__ or __value__ receivers

- With pointer receiver: the content of the receiver can be modified
- With value receiver: modification to the content of the receiver are lost at the end of the method

</v-clicks>

::right::

```go{none|1,3|4|2|all}{at:2}
var p *Person
p = = &{Name: “Al”}
al := *p
p = &al
```

<br/>

```go{none|all}{at:6}
type Person struct {
	Name string
	Age MyAge
}

func (p *Person) SetName(name string) {
  p.Name = name
}

func (p Person) GetName() string { 
  return p.Name
}
```
