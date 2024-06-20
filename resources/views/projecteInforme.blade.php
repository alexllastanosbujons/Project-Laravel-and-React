<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .authenticated-layout {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        header {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 10px;
        }

        .project-details {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .project-details p {
            font-size: 18px;
            margin-bottom: 10px;
        }

        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            text-align: center;
            text-decoration: none;
            background-color: #333;
            color: #fff;
            border: none;
            cursor: pointer;
        }

        .button:hover {
            background-color: #555;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .table th, .table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        .table th {
            background-color: #f2f2f2;
        }

        .flex {
            display: flex;
            justify-content: center;
        }

        .space-x-4 {
            margin-right: 16px;
        }

        .mt-2 {
            margin-top: 8px;
        }
    </style>
    <title>Project Details</title>
</head>
<body>
    <?php
        // Assuming $auth, $project, and other required variables are available

        // Authenticated Layout
        echo '<div class="authenticated-layout">';
        echo '<header>';
        echo '<h2>Project Details</h2>';
        echo '</header>';
        // ... (rest of the layout)
        echo '</div>';
    ?>

    <div class="project-details">
        {{-- @dd($project) --}}
        <p>Project Name: <?php echo $project['name']; ?></p>
        <p>Start Date: <?php echo $project['startDate']; ?></p>
        <p>Budget: <?php echo $project['budget']; ?></p>
        <p>Expected Hours: <?php echo $project['expectedHours']; ?></p>


        <div class="flex">
            <div class="max-w-lg w-full">
                <h2>Worked Hours</h2>
                <table class="table">
                  <tr>
                    <th>
                        USERNAME	
                    </th>
                    <th>
                        STARTHOUR
                    </th>
                    <th>
                        ENDHOUR
                    </th>
                  </tr>
                  <?php foreach ($hours as $workedHour): ?>
                      <tr>
                          <td><?php echo $workedHour['userName']; ?></td>
                          <td><?php echo $workedHour['startHour']; ?></td>
                          <td><?php echo $workedHour['endHour']; ?></td>
                      </tr>
                  <?php endforeach; ?>
              
                </table>
            </div>

            <div class="max-w-lg w-full">
                <h2>Materials Used</h2>
                <table class="table">
                    <tr>
                        <th>
                            NAME	
                        </th>
                        <th>
                            PROVEIDOR	
                        </th>
                        <th>
                            PRICE
                        </th>
                        <th>
                            QUANTITY
                        </th>
                      </tr>
                        <?php foreach ($materialUsed as $material): ?>
                            <tr>
                                <td><?php echo $material['material']; ?></td>
                                <td><?php echo $material['proveidor']; ?></td>
                                <td><?php echo $material['price']; ?></td>
                                <td><?php echo $material['quantity']; ?></td>
                            </tr>
                            <?php endforeach; ?>
                </table>
            </div>
        </div>
        
    </div>
</body>
</html>

