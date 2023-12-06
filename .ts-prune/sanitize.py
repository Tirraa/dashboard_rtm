#!/usr/bin/python3
# pylint: disable=wrong-import-position

"""This sanitizer filters out ts-prune output matches defined as false positives,
then show only the relevant results. I think it is reasonably fast."""

EARLY_EXIT_CODE: int = 0

import sys

if sys.stdin.isatty():
    sys.exit(EARLY_EXIT_CODE)

if __name__ != "__main__":
    sys.exit(EARLY_EXIT_CODE)

import os
import re
import time

# pylint: disable-next=too-few-public-methods
class PrintSideEffect:
    """Effect"""

TIMER_PIPELINE_START: float = time.monotonic()
ARTIFACT_RELATIVE_PATH: str = "../__artifacts/tsprune-false-positives.txt"

tsprune_output: str = sys.stdin.read()

TIMER_SANITIZING_START: float = time.monotonic()
tokenized_tsprune_output: list[str] = tsprune_output.splitlines()

def benchmark(t_pipeline_start: float, t_process_start: float, t_end: float) -> PrintSideEffect:
    """Displays elapsed time."""
    process_delta: float = t_end - t_process_start
    truncated_process_delta = f"{process_delta:.5f}"
    pipeline_delta: float = t_end - t_pipeline_start
    truncated_pipeline_delta = f"{pipeline_delta:.5f}"
    unit: str = 's'
    print("Sanitized and printed results in: ~", truncated_process_delta, unit, sep='')
    print("Total execution time: ~", truncated_pipeline_delta, unit, sep='')

script_path: str = os.path.abspath(__file__)
script_dir: str = os.path.dirname(script_path)

false_positives_filepath: str = os.path.join(script_dir, ARTIFACT_RELATIVE_PATH)

with open(false_positives_filepath, "r", encoding="utf-8") as input_file:
    false_positives_raw: str = input_file.read()

REGEX_PATTERN: str
REGEX_REPL: str
REGEX_PATTERN, REGEX_REPL = r':[0-9]+ - ', ':* - '

wildcarded_false_positives_raw: str = re.sub(REGEX_PATTERN, REGEX_REPL, false_positives_raw)

archive: dict = {}

for org_line in tokenized_tsprune_output:
    wildcarded_line: str = re.sub(REGEX_PATTERN, REGEX_REPL, org_line)
    archive[wildcarded_line] = org_line

wildcarded_tsprune_output_lines_set = s1 = set(archive.keys())
wildcarded_false_positives_lines_set = s2 = set(wildcarded_false_positives_raw.splitlines())

potential_issues: set = s1.symmetric_difference(s2)

if len(potential_issues) == 0:
    print("OK: No ts-prune errors")
    benchmark(TIMER_PIPELINE_START, TIMER_SANITIZING_START, time.monotonic())
else:
    for wildcarded_element in potential_issues:
        print(archive[wildcarded_element])
    print()
    print("ATTENTION: Found", len(potential_issues), "potential issues.")
    benchmark(TIMER_PIPELINE_START, TIMER_SANITIZING_START, time.monotonic())
