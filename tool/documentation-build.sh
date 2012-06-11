## bash script for building MgvJS documentation
## see http://code.google.com/p/ext-doc/wiki/RunningExtDoc
##
## format:
## java -jar %jar_file% -p %doc_definition_xml_file% -o %output_older% -t %template_xml_file%  -verbose
##
## how to use:
## - run bash in Terminal
## - #!/bin/bash GravityJS/src/documentation-build.sh
##
java -jar /Users/bagus/Documents/Workspace/Magnivate/GravityJS/tool/ext-doc/ext-doc.jar -p /Users/bagus/Documents/Workspace/Magnivate/GravityJS/tool/documentation.xml -o /Users/bagus/Documents/Workspace/Magnivate/GravityJS/docs -t /Users/bagus/Documents/Workspace/Magnivate/GravityJS/tool/ext-doc/template/ext/template.xml -verbose