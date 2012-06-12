## bash script for building GravityJS documentation
## see http://code.google.com/p/ext-doc/wiki/RunningExtDoc
##
## format:
## java -jar %jar_file% -p %doc_definition_xml_file% -o %output_older% -t %template_xml_file%  -verbose
##
## how to use (assume the system is Windows):
## - double click this .bat files to run it as application
##
java -jar C:/xampp/htdocs/gravityjs/tool/ext-doc/ext-doc.jar -p C:/xampp/htdocs/gravityjs/tool/documentation.xml -o C:/xampp/htdocs/gravityjs/docs -t C:/xampp/htdocs/gravityjs/tool/ext-doc/template/ext/template.xml -verbose