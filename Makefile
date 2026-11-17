PREFIX = kolserdav
NAMESPACE = work
NAME = portfolio
FULL_NAME = $(PREFIX)/$(NAME)
TAG = 0.0.15

restart:
	kubectl rollout restart -n $(NAMESPACE) deployment/$(NAME)
build:
	docker buildx build  -f Dockerfile --tag $(FULL_NAME):latest --tag $(FULL_NAME):$(TAG)  --output="type=registry" .
deploy:
	make build
exec:
	kubectl exec -it -n $(NAMESPACE) $$(kubectl get pods -n $(NAMESPACE) -l app=$(NAME) --field-selector=status.phase=Running -o=jsonpath='{.items[*].metadata.name}') -c app -- bash
logs:
	kubectl logs -n $(NAMESPACE) $$(kubectl get pods -n $(NAMESPACE) -l app=$(NAME) --field-selector=status.phase=Running -o=jsonpath='{.items[*].metadata.name}') -f