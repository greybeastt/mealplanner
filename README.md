# mealplanner

## TODO

1. [x] jwt auth
2. [x] browse all meals
   - [x] pagination
3. [ ] each meal
   - [x] get
   - [ ] update
   - [ ] delete
4. [ ] generation
   - [ ] breakfast
   - [ ] launch
   - [ ] dinner
   - [ ] snacks

# reverse engineering the algorithem

- 1 meal 200 cals an 4000
- 9 meals max
- x meal=>cals min(200, x*100) : 4000*x
- margine of error +/-5
- main dishes => [breakfast, Launch, dinner] fillers are snacks

- on one mealy only is is alway

  | no of meals | calories   | results                                                                                               |
  | ----------- | ---------- | ----------------------------------------------------------------------------------------------------- |
  | 1           | 200 - 4000 | always two meals at launch                                                                            |
  | 2           | 400 - 8000 | always launch and dinner with slightly more clas. on dinner                                           |
  | 3           | x          | breakfast, launch, dinner                                                                             |
  | 4           | x          | breakfast, launch, dinner, snacks snack is less 10% of the total cals                                 |
  | 5           | x          | breakfast, launch, snack, dinner, snacks; snacks is less 10% of the total cals                        |
  | 6           | x          | breakfast, snacks,launch, snack, dinner, snacks; snacks is less 10% of the total cals                 |
  | 7           | x          | breakfast, snacks,launch, snack, dinner, snacks; snacks is less 10% of the total cals                 |
  | 8           | x          | breakfast, snacks,launch, snack, dinner, snacks, snacks; snacks is less 10% of the total cals         |
  | 9           | x          | breakfast, snacks, snacks,launch, snack, dinner, snacks, snacks; snacks is less 10% of the total cals |
