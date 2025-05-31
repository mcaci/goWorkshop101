---
transition: fade-out
layout: lblue-fact
---

Let's Go: Hello World!

---
transition: fade-out
---

# Environment setup

Let's setup our first Go project

```bash {all|3|4}{at:2}
$ GIT_PLATFORM_URL=github.com; USER=mcaci; PROJECT_NAME=letsgo
$ mkdir -p ~/go/src/$GIT_PLATFORM_URL/$USER/$PROJECT_NAME && cd ~/go/src/$GIT_PLATFORM_URL/$USER/$PROJECT_NAME
$ go mod init
go: creating new go.mod: module github.com/mcaci/letsgo
$ git init # optional if you want to commit your code
```

<v-click>

We'll focus on two things:
</v-click>

<v-click>

1. `go mod init`

Initializes a Go project as a [module](https://go.dev/ref/mod), a set of Go packages that can be imported by other Go modules

Creates a file `go.mod` that contains information about the go version used to compile our code and the dependencies that our module uses
</v-click>

<v-click>

2. __module github.com/mcaci/letsgo__

Go projects can be put anywhere but to make module creation and management easier we use the path `~/go/src/$GIT_PLATFORM_URL/$USER/$PROJECT_NAME` 
</v-click>

---
transition: fade-out
---

# Hello world!

Open your editor on the created folder and create a `main.go` file

<v-click>

Inside `main.go` write the following code

```go
package main

import “fmt”

func main() {
  fmt.Println(“Hello, world!”)
}
```
</v-click>

<v-click>

Then run

```bash
$ go run main.go
Hello, world!
```
</v-click>

<v-clicks>

`go run` will build and execute the code.

You may create the executable with `go build`, for example:

```bash
$ go build -o hello-world main.go
```
</v-clicks>

---
transition: fade-out
layout: two-cols-header
---

# Hello world!

What can we learn?

::left::

1. how to create a function
1.1 main as the entry point 
2. how to call a function: _package_name.function_name_
3. what is a package and how to handle it
3.1 package definition
3.2 import statement
4. ! not mandatory 


:: right::

show the code examples along the way

theory now

---
transition: fade-out
layout: two-cols-header
---

# Hello world!

What can we learn?

::left::

`package main` is a package declaration

A __package__ is a __set of symbols__ (functions, types, variables) that can be distributed to other packages to be used

It is mandatory as first instruction in every file

`import "fmt"` is an import declaration that states that we are using the __fmt__ package

`func main()` is the entrypoint of every Go application

`fmt.Println` is a function call that accepts a string and prints it to the screen

Syntax: _package_name.function_name_

::right::

```go{all|1|3|5-7|6|all}
package main

import “fmt”

func main() {
  fmt.Println(“Hello, world!”)
}
```

<v-click>
Notice that the `;` is not mandatory at the end of the line
</v-click>

<arrow v-click="[1, 2]" x1="350" y1="110" x2="195" y2="140" color="#953" width="2" arrowSize="1" />
<arrow v-click="[2, 3]" x1="350" y1="280" x2="195" y2="310" color="#953" width="2" arrowSize="1" />
<arrow v-click="[3, 4]" x1="330" y1="345" x2="175" y2="375" color="#953" width="2" arrowSize="1" />
<arrow v-click="[4, 5]" x1="330" y1="410" x2="175" y2="440" color="#953" width="2" arrowSize="1" />

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