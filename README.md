# mealplanner

## TODO

1. [x] jwt auth
2. [ ] browse all meals
   - [ ] pagination
3. [ ] each meal
   - [ ] get
   - [ ] update
   - [ ] delete

# reverse engineering the algorithem

- 1 meal 200 cals an 4000
- 9 meals max
- x meal=>cals min(200, x*100) : 4000*x
- margine of error +/-5
- main dishes => [breakfast, Launch, dinner] fillers are snacks
