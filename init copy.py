def is_valid(num):
    return all(digit != '0' for digit in num)


def count_valid_numbers(blocks, current_num, index, k_count, k):
    if index == len(blocks):
        if is_valid(current_num):
            k_count[0] += 1
            if k_count[0] == k:
                k_count[1] = int(current_num)
        return

    block = blocks[index]
    for digit in block:
        count_valid_numbers(blocks, current_num + digit, index + 1, k_count, k)


def divide_into_blocks(s, x, n):
    blocks = []
    for i in range((n + x - 1) // x):
        block_start = i * x
        block_end = min(n, (i + 1) * x)
        blocks.append(s[block_start:block_end])
    return blocks


def Find_It(N, X, K, S):
    blocks = divide_into_blocks(S, X, N)
    k_count = [0, 0]
    count_valid_numbers(blocks, '', 0, k_count, K)
    print(k_count)


Find_It(10, 5, 10, '1234567891')


def is_valid(num):
    # Check if a number is valid
    return all(digit != '0' for digit in num)  # Ensure no leading zeros


def count_valid_numbers(blocks, current_num, index, k_count):
    # Recursively count valid numbers until reaching kth number
    if index == len(blocks):
        if is_valid(current_num):
            k_count[0] += 1
            if k_count[0] == k:
                k_count[1] = int(current_num)
        return

    block = blocks[index]
    for digit in block:
        count_valid_numbers(blocks, current_num + digit, index + 1, k_count)


def divide_into_blocks(s, x):
    # Divide the string into blocks
    blocks = []
    for i in range((len(s) + x - 1) // x):
        block_start = i * x
        block_end = min(len(s), (i + 1) * x)
        blocks.append(s[block_start:block_end])
    return blocks


def find_kth_number(s, x, k):
    blocks = divide_into_blocks(s, x)
    k_count = [0, 0]  # [Count of valid numbers found, kth number]
    count_valid_numbers(blocks, '', 0, k_count)
    return k_count[1]


def main():
    s = input().strip()
    x = int(input().strip())
    k = int(input().strip())

    kth_number = find_kth_number(s, x, k)
    print(kth_number)


if __name__ == "__main__":
    main()
