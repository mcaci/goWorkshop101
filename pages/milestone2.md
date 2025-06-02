---
transition: fade-out
layout: lblue-fact
---

Let's Go: Milestone 2

---
transition: fade-out
---

# Milestone 2

Looping through a text file in input

Objective: Update the code from milestone 1 to read and output a text file

Bonus: Use the `strconv` package to test what kind of input we receive

<v-click>

For this milestone we will introduce:
- types
- loops

</v-click>

---
transition: fade-out
layout: two-cols-header
---

# Types in Go

All the categories

::left::

<v-clicks depth=2>

- __primitive__ types
  - `string`: immutable sequence of characters
  - numeric types
  - `bool`
- __internal__ types
- __custom__ types
  - _type aliasing_ used to rename any type
  - _complex type_ used to group fields
-  __methods__ are functions attached to custom types
    - the type between `()` is called __receiver__
    - custom types and methods are the closest structure to a class in other languages
</v-clicks>

::right::

```go{none|1|2-3|4|all}{at:2}
string
[u|]int[|8|16|32|64], float[32|64], complex[64|128]
byte, rune // aliases for uint8 and int
bool
```

<br/>

```go{none|1|3-6|3-10|all}{at:7}
type MyAge int // type aliasing

type Person struct { // complex type
	Name string
	Age MyAge
}

func (p Person) String() string { // method
	return fmt.Sprint(p.Name, “-”, p.age)
}
```

<arrow v-click="[10, 11]" x1="700" y1="350" x2="590" y2="390" color="#953" width="2" arrowSize="1" />


---
transition: fade-out
layout: two-cols-header
---

# Zero values

Zero values

::left::

<v-clicks>

All variables in Go are assigned to a value
- if not explicitly assigned Go assigns a default value for the type,
- This is called the __zero value__
  - `""` (empty string) for strings
  - `0` for numeric types
  - `false` for booleans
  - type aliases are assigned the zero value of its underlying type
  - complex types are assigned the zero value of each field

</v-clicks>

::right::

```go{none|1-13|1-13|15-17|15-17|19-22|19-22}{at:1}
string = ""
[u|]int[|8|16|32|64], float[32|64], complex[64|128] = 0
byte, rune = 0
bool = false

type MyAge int = 0 // because it is an int
type Person struct {
	Name string
	Age MyAge
} = Person{Name: “”, MyAge: 0}
```

---
transition: fade-out
layout: two-cols-header
---

# Pointers

Pointers

::left::

<v-clicks>

They work as in C/C++: use `*` to declare a pointer and to dereference and `&` to take the address of a variable

All custom types methods (type aliases and complex type) can have pointer or value receiver.

A method with pointer receiver can modify the content of the type

A method with value receiver cannot

</v-clicks>

::right::

```go{none|1-13|1-13|15-17|15-17|19-22|19-22}{at:1}
var p *Person = &{Name: “Al”}
al := *p
p = &al
```

---
transition: fade-out
layout: two-cols-header
---

# Loops

For in all its forms

::left::

<v-clicks>

Similar as other languages but without `()` and mandatory `{}`

Only `for` kewyord exist for loops

Can be interrupted with the `break` keyword

Meaning of the two variables in the `for-range` syntax
<table>
  <tr>
    <th>type</th>
    <th>i</th>
    <th>v</th>
  </tr>
  <tr>
    <td>string</td>
    <td>index</td>
    <td>character at position i</td>
  </tr>
  <tr>
    <td>array/slice</td>
    <td>index</td>
    <td>element at position i</td>
  </tr>
  <tr>
    <td>map</td>
    <td>key</td>
    <td>value</td>
  </tr>
</table>

</v-clicks>

::right::

```go{none|all|all|18-20|14-22|17|all}{at:1}
// regular for loop
for i := 0; i < 10; i++ {} 

// while loop
var n []int
// len is a builtin function, it computes the length of
// strings, arrays, slices, maps and channels
for len(n) < 3 { 
  n = append(n, 1)
}

for true {} // infinite loop

// for-range syntax
// iterates on all items of
// strings, arrays, slices, maps and channels
for i, v := range n { 
  if i > 1 {
    break
  }
  fmt.Println(i, v) // 0 1\n1 1\n
}

```

---
transition: fade-out
layout: two-cols-header
---

# Steps for Milestone 2

Writing text to a file: use pkg.go.dev to read the content of the packages

::left::

In your `main` function:

1. Create a file, using the `os` package
2. If there are any errors during the file creation
   - log them and exit with the `log` package
3. Write the "hello, world!" string to the file 
    - use the `fmt` package
4. Close the file

Bonus steps:

- Take the text to write as input of the application
  - use the `flag` package
- Test the `defer` keyword when closing the file


::right::
⚠️ __type always goes after the name__
<v-click>
````md magic-move {lines: true}
```go{all|10|11-13|14|15|all}
package main

import (
	"fmt"
	"log"
	"os"
)

func main() {
	f, err := os.Create("./out/text")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintln(f, "Hello World!")
	f.Close()
}
```

```go{all|9,17|14-16|all}
import (
	"flag"
	"fmt"
	"log"
	"os"
)

func main() {
	flag.Parse()
	f, err := os.Create("./out/text")
	if err != nil {
		log.Fatal(err)
	}
  // defer keyword delegates the execution of the 
  // function call at the end of the function
	defer f.Close()
	fmt.Fprintln(f, flag.Args())
}
```
````
</v-click>
