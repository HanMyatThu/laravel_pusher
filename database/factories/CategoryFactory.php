<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model\Category;
use Faker\Generator as Faker;

$factory->define(Category::class, function (Faker $faker) {
    $work = $faker->word;
    return [
        'name' => $work,
        'slug' => str_slug($work)
    ];
});
