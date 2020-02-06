
ibmCloud login --sso

ibmCloud cf push -f C:\PSHDEV\PSH-WorkShops\IBM-Node-Red-APP2020\IBM-Node-Red-APP2020\LABS\Lab0\manifest.yml


C:\PSHDEV\PSH-WorkShops\IBM-Node-Red-APP2020\IBM-Node-Red-APP2020\LABS\Lab0>ibmCloud cf push -h
Invoking 'cf help push'...

NAME:
   push - Push a new app or sync changes to an existing app

USAGE:
   cf.exe push APP_NAME [-b BUILDPACK_NAME] [-c COMMAND] [-f MANIFEST_PATH | --no-manifest] [--no-start]
   [-i NUM_INSTANCES] [-k DISK] [-m MEMORY] [-p PATH] [-s STACK] [-t HEALTH_TIMEOUT] [-u (process | port | http)]
   [--no-route | --random-route | --hostname HOST | --no-hostname] [-d DOMAIN] [--route-path ROUTE_PATH] [--var KEY=VALUE]... [--vars-file VARS_FILE_PATH]...

   cf.exe push APP_NAME --docker-image [REGISTRY_HOST:PORT/]IMAGE[:TAG] [--docker-username USERNAME]
   [-c COMMAND] [-f MANIFEST_PATH | --no-manifest] [--no-start]
   [-i NUM_INSTANCES] [-k DISK] [-m MEMORY] [-t HEALTH_TIMEOUT] [-u (process | port | http)]
   [--no-route | --random-route | --hostname HOST | --no-hostname] [-d DOMAIN] [--route-path ROUTE_PATH] [--var KEY=VALUE]... [--vars-file VARS_FILE_PATH]...

   cf.exe push APP_NAME --droplet DROPLET_PATH
   [-c COMMAND] [-f MANIFEST_PATH | --no-manifest] [--no-start]
   [-i NUM_INSTANCES] [-k DISK] [-m MEMORY] [-t HEALTH_TIMEOUT] [-u (process | port | http)]
   [--no-route | --random-route | --hostname HOST | --no-hostname] [-d DOMAIN] [--route-path ROUTE_PATH] [--var KEY=VALUE]... [--vars-file VARS_FILE_PATH]...

   cf.exe push -f MANIFEST_WITH_MULTIPLE_APPS_PATH [APP_NAME] [--no-start]

ALIAS:
   p

OPTIONS:
   -b                           Custom buildpack by name (e.g. my-buildpack) or Git URL (e.g. 'https://github.com/cloudfoundry/java-buildpack.git') or Git URL with a branch or tag (e.g. 'https://github.com/cloudfoundry/java-buildpack.git#v3.3.0' for 'v3.3.0' tag). To use built-in buildpacks only, specify 'default' or 'null'
   -c                           Startup command, set to null to reset to default start command
   -d                           Specify a custom domain (e.g. private-domain.example.com, apps.internal.com) to use instead of the default domain
   --docker-image, -o           Docker-image to be used (e.g. user/docker-image-name)
   --docker-username            Repository username; used with password from environment variable CF_DOCKER_PASSWORD
   --droplet                    Path to a tgz file with a pre-staged app
   -f                           Path to manifest
   --health-check-type, -u      Application health check type (Default: 'port', 'none' accepted for 'process', 'http' implies endpoint '/')
   --hostname, -n               Hostname (e.g. my-subdomain)
   -i                           Number of instances
   -k                           Disk limit (e.g. 256M, 1024M, 1G)
   -m                           Memory limit (e.g. 256M, 1024M, 1G)
   --no-hostname                Map the root domain to this app
   --no-manifest                Ignore manifest file
   --no-route                   Do not map a route to this app and remove routes from previous pushes of this app
   --no-start                   Do not start an app after pushing
   -p                           Path to app directory or to a zip file of the contents of the app directory
   --random-route               Create a random route for this app
   --route-path                 Path for the route
   -s                           Stack to use (a stack is a pre-built file system, including an operating system, that can run apps)
   --vars-file                  Path to a variable substitution file for manifest; can specify multiple times
   --var                        Variable key value pair for variable substitution, (e.g., name=app1); can specify multiple times
   -t                           Time (in seconds) allowed to elapse between starting up an app and the first healthy response from the app

ENVIRONMENT:
   CF_STAGING_TIMEOUT=15        Max wait time for buildpack staging, in minutes
   CF_STARTUP_TIMEOUT=5         Max wait time for app instance startup, in minutes
   CF_DOCKER_PASSWORD=          Password used for private docker repository

