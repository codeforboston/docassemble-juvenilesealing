import os
import sys
from setuptools import setup, find_namespace_packages
from fnmatch import fnmatchcase
from distutils.util import convert_path

standard_exclude = ('*.pyc', '*~', '.*', '*.bak', '*.swp*')
standard_exclude_directories = ('.*', 'CVS', '_darcs', './build', './dist', 'EGG-INFO', '*.egg-info')

def find_package_data(where='.', package='', exclude=standard_exclude, exclude_directories=standard_exclude_directories):
    out = {}
    stack = [(convert_path(where), '', package)]
    while stack:
        where, prefix, package = stack.pop(0)
        for name in os.listdir(where):
            fn = os.path.join(where, name)
            if os.path.isdir(fn):
                bad_name = False
                for pattern in exclude_directories:
                    if (fnmatchcase(name, pattern)
                        or fn.lower() == pattern.lower()):
                        bad_name = True
                        break
                if bad_name:
                    continue
                if os.path.isfile(os.path.join(fn, '__init__.py')):
                    if not package:
                        new_package = name
                    else:
                        new_package = package + '.' + name
                        stack.append((fn, '', new_package))
                else:
                    stack.append((fn, prefix + name + '/', package))
            else:
                bad_name = False
                for pattern in exclude:
                    if (fnmatchcase(name, pattern)
                        or fn.lower() == pattern.lower()):
                        bad_name = True
                        break
                if bad_name:
                    continue
                out.setdefault(package, []).append(prefix+name)
    return out

setup(name='docassemble.juvenilesealing',
      version='1.0.1',
      description=('A docassemble extension for sealing juvenile records.'),
      long_description='# Sealing Juvenile Records\r\n\r\nThis process should be easier for both petitioners themselves and\r\nlegal professionals who hope to support petitioners. This tool\r\nis focused on MA.\r\n\r\n## Design\r\n\r\n### MVP should include\r\n\r\n1. Expectation setting.\r\n1. Links to support we cannot provide.\r\n1. Mobile friendly UI.\r\n1. A printable PDF.\r\n\r\n### Interview steps\r\n\r\n1. Check for immigration status **separately from the main interview**\r\n1. Screen for legal professionals\r\n1. Link to get certified dockets\r\n1. Sealing eligibility questions\r\n1. Personal details questions\r\n1. Downloadable/printable pre-filled petition PDF\r\n1. Provide the address for mailing the petition\r\n\r\n## Users\r\n\r\n### Target Audiences\r\n\r\n1. Petitioners.\r\n1. Legal professionals or clinic volunteers.\r\n\r\n### Unresovled Petitioner Barriers\r\n\r\n1. Frustration and distrust of the process.\r\n1. No access to printers.\r\n1. Which vocabulary will they find familiar?\r\n\r\n**User research needs to play a large role in the design of this tool.**\r\n\r\nThis tool is made with [Docassemble](https://github.com/jhpyle/docassemble).\r\n\r\n## Testing\r\n\r\n### Cucumber tests\r\n\r\nTo get these tests to run on your local development machine (e.g., your laptop), make sure you have NPM installed.\r\n\r\nThe first time you run these tests, type `npm install` into your terminal. This will install the packages required for testing.\r\n\r\nTo run the tests, type `npm run local` into your terminal.\r\n\r\nTo run a single test file:\r\n```\r\nnpm run setup\r\n./node_modules/.bin/cucumber-js --require ./node_modules/docassemble-cucumber/lib/index.js tests/features/TEST_NAME.feature\r\nnpm run takedown\r\n```\r\n',
      long_description_content_type='text/markdown',
      author='knod',
      author_email='lsquery@example.com',
      license='',
      url='https://docassemble.org',
      packages=find_namespace_packages(),
      install_requires=['docassemble.gbls>=0.0.58'],
      zip_safe=False,
      package_data=find_package_data(where='docassemble/juvenilesealing/', package='docassemble.juvenilesealing'),
     )
