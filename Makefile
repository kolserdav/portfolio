PREFIX = kolserdav
NAMESPACE = work
NAME = portfolio
FULL_NAME = $(PREFIX)/$(NAME)

restart:
	kubectl rollout restart -n $(NAMESPACE) $(NAME_DEV)
build:
	docker buildx build  -f Dockerfile --tag $(FULL_NAME):latest --output="type=registry" .
deploy:
	make build
	make restart
exec:
	kubectl exec -it -n $(NAMESPACE) $$(kubectl get pods -n $(NAMESPACE) -l app=$(NAME) --field-selector=status.phase=Running -o=jsonpath='{.items[*].metadata.name}') -c app -- bash
logs:
	kubectl logs -n $(NAMESPACE) $$(kubectl get pods -n $(NAMESPACE) -l app=$(NAME) --field-selector=status.phase=Running -o=jsonpath='{.items[*].metadata.name}') -f