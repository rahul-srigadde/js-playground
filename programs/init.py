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
    print(k_count[1])
