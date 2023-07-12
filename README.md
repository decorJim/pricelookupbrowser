# pricelookupbrowser
browser app for iphone X in safari


# LINK hosted front end with server 
# having an ip for the server is not enough 
# hosted front end plateform will block http request

# associate a website name with ip of server
- go to aws "routing 53" in the services
- in the domain section, type in a website name for the server and see if available
- register that domain
- go to section "hosted zone" and create 2 new records
- "@.abc.net" and "www.abc.net"
- wait for a bit and test by typing a route inside browser

# ssl/tls certificate
- go to aws certificate manager
- request a certificat
- click on "create records in route 53"

# setup cloudflare
- create account on cloudflare
- add website domain name abc.com
- in the dns section www.abc.com and abc.com as A with associated IP
- in the dns section also add aws certificate CNAME and its value
- go back to aws routing 53 in section registered domain
- delete all 4 aws random link and put in the 2 cloudflare nameservers
- come back to cloudflare and complete the quick start guide in overview


# BE CAREFUL MY INSTANCE LOCATION AND THE DOMAIN AND CERTIFICATE ARE NOT THE SAME
# search in N. VIRGINIA for routing 53, aws certificat manager, cloudfront
# search in CANADA central for ec2 instance
- https://www.youtube.com/watch?v=YVbwVet8aI4&ab_channel=GSoftKnowledge

- ns-1455.awsdns-53.org.
- ns-249.awsdns-31.com.
- ns-1824.awsdns-36.co.uk.
- ns-673.awsdns-20.net.

- cmd shift R to erase mac cache
