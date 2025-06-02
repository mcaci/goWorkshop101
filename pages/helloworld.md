---
transition: fade-out
layout: lblue-fact
---

Let's Go: Hello World!

---
transition: fade-out
---

# Hello World

Setup, code, run

1. Create a folder that will contain your Go code
2. Open a terminal on that folder and run `go mod init $MODULE_NAME`

```bash
$ go mod init helloworld
go: creating new go.mod: module helloworld
```

3. Create a `main.go` inside the same folder
4. Copy the code below inside the `main.go` file

```go
package main
import “fmt”

func main() {
  fmt.Println(“Hello, world!”)
}
```

5. Use the terminal to run `go run main.go`

```bash
$ go run main.go
Hello, world!
```

---
transition: fade-out
layout: two-cols-header
---

# Hello world!

What can we learn?

::left::

<v-clicks>

- How to create a function with the `func` keyword
  - `func main()` is the entrypoint of every Go application
- How to call a function: `package_name.function_name`
  - `fmt.Println` is a function call that accepts a string and prints it to the screen
- How to import packages (from the standard library)
- How to say that which package owns the code
  - It is mandatory as first instruction in every file
  - `func main` always goes in `package main`
- The fact that `;` are absent at the end of the line

</v-clicks>

::right::

```go{all|5,7|6|3|1|all}{at:1}
package main

import “fmt”

func main() {
  fmt.Println(“Hello, world!”)
}
```

<!-- 
Every go file starts with a package declaration
- Every folder is a package
- Tells in which package the code is located
func main(): the entrypoint
- Always located in package main
- Present only once
import statement
- Tells which packages are used in the file
fmt.Println is a function
- It prints a message (a string) to the screen
Function invocation
- package_name.function_name
“;” is not mandatory at the end of a statement
-->

---
transition: fade-out
hide: true
---

# Hello World

Setup: what can we learn?

```bash
$ go mod init helloworld
go: creating new go.mod: module helloworld
```
<br/>

1. `go mod init`

Initializes a Go project as a [module](https://go.dev/ref/mod), a set of Go packages that can represent a library, an application, a microservice, etc.

2. `go.mod`

A file that contains information about
- the Go version used to compile our module
- the dependencies, as modules, that our module uses