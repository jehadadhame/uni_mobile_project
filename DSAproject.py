class Grade:
    def __init__(self, courseName, grade):
        if (grade < 0 or grade > 100):
            raise ValueError("Grade must be between 0 and 100")
        self.courseName = courseName
        self.grade = grade


class Node:
    def __init__(self, grade):
        self.grade = grade
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def __len__(self):
        return self.length

    def insert(self, value):
        node = Node(value)
        self.length += 1

        if not self.head:
            self.head = node
            return

        curren = self.head
        while curren.next:
            curren = curren.next

        curren.next = node

    def printGrades(self):
        curren = self.head
        while curren:
            grade = curren.grade
            print(f"course name : {grade.courseName} grade {grade.grade} ")
            curren = curren.next

    def getAvg(self):
        sum = 0
        curren = self.head
        while curren:
            grade = curren.grade
            sum += grade.grade
            curren = curren.next
        return sum/self.length

    def toNormalList(self):
        normalList = NormalList()
        curren = self.head
        while curren:
            normalList.insert(curren.grade)
            curren = curren.next
        return normalList


class NormalList:
    def __init__(self, size=20):
        self.arr = [None]*size
        self.last_index = -1
        self.size = size
        self.length = 0

    def __len__(self):
        return self.length

    def resize(self):
        self.size *= 2
        newArray = [None] * (self.size)
        i = 0
        for grade in self.arr:
            newArray[i] = grade
            i += 1
        self.arr = newArray

    def insert(self, grade):
        if (self.last_index+1 >= self.size):
            self.resize()

        self.last_index += 1
        self.length += 1
        self.arr[self.last_index] = grade

    def printGrades(self):
        for i in range(self.length):
            grade = self.arr[i]
            print(
                f"in normal list course name : {grade.courseName},     grade {grade.grade} ")

    def getAvg(self):
        if (self.length) == 0:
            return 0
        sum = 0
        for i in range(self.length):
            grade = self.arr[i]
            sum += grade.grade

        return (sum / self.length)

    def toLinkedList(self):
        linkedList = LinkedList()
        for i in range(self.length):
            grade = self.arr[i]
            linkedList.insert(grade)
        return linkedList


grades = [Grade("Math", 95), Grade("English", 88), Grade("Biology", 76), Grade("Chemistry", 92), Grade("Physics", 81), Grade(
    "History", 67), Grade("Geography", 73), Grade("Compdeuter Science", 99), Grade("Art", 85), Grade("Physical Education", 90)]

linkedList = LinkedList()
normalList = NormalList()

for grade in grades:
    normalList.insert(grade)
    linkedList.insert(grade)


# print("LinkedList test : ")
# linkedList.printGrades()
# print(
#     f"list avarage is : {linkedList.getAvg()} with length equal {linkedList.length}")
# print()

# # converting to new list
# convertedNormalList = linkedList.toNormalList()
# convertedNormalList.printGrades()


# print()
# print()
# print()


# print("normalList test : ")
# print()
# normalList.printGrades()
# normalList.printGrades()

# print(
#     f"list avarage is : {normalList.getAvg()} with length equal {normalList.length}")
# print()

# convertedLinkedList = normalList.toLinkedList()
# convertedLinkedList.printGrades()

def printTheMenu():
    print("\n========== Course Grade System ==========")
    print("1. Add course to array")
    print("2. Print array")
    print("3. Array average")
    print("4. Convert array → linked list")
    print("5. Print linked list")
    print("6. Linked list average")
    print("7. Convert linked list → array")
    print("8. print The Menu")
    print("0. Exit")


def runMenu():
    normalList = NormalList()
    linkedList = LinkedList()
    printTheMenu()
    while True:

        choice = input("Choose an option: ")

        if choice == "1":
            course = input("Course name: ")
            grade = int(input("Grade: "))
            normalList.insert(Grade(course, grade))
            print("Added!")

        elif choice == "2":
            normalList.printGrades()

        elif choice == "3":
            print("Array average:", normalList.getAvg())

        elif choice == "4":
            linkedList = normalList.toLinkedList()
            print("Converted to linked list.")

        elif choice == "5":
            linkedList.printGrades()

        elif choice == "6":
            print("Linked list average:", linkedList.getAvg())

        elif choice == "7":
            normalList = linkedList.toNormalList()
            print("Converted to normal array.")

        elif choice == "8":
            printTheMenu()

        elif choice == "0":
            print("Goodbye!")
            break

        else:
            print("Invalid option, try again.")


# Run the menu:
runMenu()
