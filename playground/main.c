#include "add.h"
#include <stdio.h>

int main(void) {
  puts("This is a shared library test...");
  // foo();
  int sum = add(1, 20);
  printf("sum: %d", sum);
  return 0;
}
