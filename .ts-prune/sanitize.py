#!/usr/bin/python3
# pylint: disable=wrong-import-position

"""This sanitizer filters out ts-prune output matches defined as false positives,
then show only the relevant results. I think it is reasonably fast."""

import sys

if sys.stdin.isatty() or __name__ != "__main__":
    sys.exit(0)

import os
import re
import time
from typing import Tuple
# pylint: disable-next=too-few-public-methods
class PrintSideEffect:
    """Effect"""

TIMER_PIPELINE_START: float = time.monotonic()
TSPRUNE_OUTPUT: str = sys.stdin.read()
TIMER_SANITIZING_START: float = time.monotonic()
QUIET_CTX = "--quiet" in sys.argv[1:]
DIR: str = os.path.dirname(os.path.abspath(__file__))
FALSE_POSITIVES_FILEPATH: str = os.path.join(DIR, "./artifacts/tsprune-false-positives.conf")

REGEX_PATTERN: str
REGEX_REPL: str
REGEX_PATTERN, REGEX_REPL = r":[0-9]+ - ", ":* - "

__errno: int = 0

with open(FALSE_POSITIVES_FILEPATH, "r", encoding="utf-8") as input_file:
    FALSE_POSITIVES_RAW: str = input_file.read()

# pylint: disable-next=too-many-statements
def analyze() -> PrintSideEffect:
    """Main"""

    def build_false_positives_deck(tokens: list[str]) -> dict:
        """Deck builder"""
        deck: dict = {}
        for org_line in tokens:
            _org_line = org_line.strip()
            if len(_org_line) == 0 or _org_line.startswith('#'):
                continue
            card: str = re.sub(REGEX_PATTERN, REGEX_REPL, _org_line)
            deck[card] = org_line
        return deck

    def build_tsprune_output_deck(tokens: list[str]) -> dict:
        """Deck builder"""
        deck: dict = {}
        for org_line in tokens:
            card: str = re.sub(REGEX_PATTERN, REGEX_REPL, org_line)
            deck[card] = org_line
        return deck

    tsprune_output_deck = build_tsprune_output_deck(TSPRUNE_OUTPUT.splitlines())
    false_positives_deck = build_false_positives_deck(FALSE_POSITIVES_RAW.splitlines())

    s1, s2 = set(tsprune_output_deck.keys()), set(false_positives_deck.keys())
    potential_issues: set = s1.symmetric_difference(s2)

    def make_reports() -> PrintSideEffect:
        """Makes reports, then displays them"""
        def retrieve_original_values() -> Tuple[list[str], list[str]]:
            """Retrieves original data via the analyzer indexes"""
            issues, false_positives = [], []
            if len(potential_issues) > 0:
                for wildcarded_element in potential_issues:
                    try:
                        issues.append(tsprune_output_deck[wildcarded_element])
                    except KeyError:
                        false_positives.append(false_positives_deck[wildcarded_element])
            return issues, false_positives

        issues, false_positives = retrieve_original_values()
        issues_count, false_positives_count = len(issues), len(false_positives)

        def print_benchmark(
          t_pipeline_start: float, t_process_start: float, t_end: float = time.monotonic()
        ) -> PrintSideEffect:
            """Report"""
            unit: str = 's'
            process_delta, pipeline_delta = t_end - t_process_start, t_end - t_pipeline_start
            trunc_proc_delta, trunc_pipe_delta = f"{process_delta:.5f}", f"{pipeline_delta:.5f}"
            print("Sanitized and printed results in: ~", trunc_proc_delta, unit, sep='')
            print("Total execution time: ~", trunc_pipe_delta, unit, sep='')

        def print_issues() -> PrintSideEffect:
            """Report"""
            if issues_count <= 0:
                return
            w = "unknown ts-prune issues" if issues_count > 1 else "an unknown ts-prune issue"
            print(f"Found {w}:")
            for issue in issues:
                print(issue)

        def print_outdated_artifact() -> PrintSideEffect:
            """Report"""
            _c = false_positives_count
            if QUIET_CTX or _c <= 0:
                return
            if issues_count > 0:
                print()
            w = "entries" if _c > 1 else "entry"
            print(f"Found {_c} outdated {w} in the false positives artifact:", file=sys.stderr)
            for false_positive in false_positives:
                print(false_positive, file=sys.stderr)

        def print_brief() -> PrintSideEffect:
            """Report"""
            if not QUIET_CTX and false_positives_count > 0:
                print()
            elif issues_count > 0:
                print()
            if issues_count == 0:
                print("SUCCESS: No ts-prune errors")
            else:
                # pylint: disable-next=global-statement
                global __errno
                __errno = 1
                w = "issues" if issues_count > 1 else "issue"
                print(f"FAILURE: Found {issues_count} unknown {w}.")

        def print_notes() -> PrintSideEffect:
            """Report"""
            _c = false_positives_count
            if _c > 0 and QUIET_CTX:
                w = "outdated entries" if _c > 1 else "outdated entry"
                print(
                  '\n' + f"[Note] Found {_c} {w} in the false positives artifact",
                  file=sys.stderr)
                w = "them" if _c > 1 else "it"
                print(f"(Use the 'ts-prune-verbose' script to log {w})", file=sys.stderr)

        # pylint: disable-next=[multiple-statements,line-too-long]
        print_issues(); print_outdated_artifact(); print_brief(); print_benchmark(TIMER_PIPELINE_START, TIMER_SANITIZING_START); print_notes(); sys.exit(__errno)
    make_reports()
analyze()
