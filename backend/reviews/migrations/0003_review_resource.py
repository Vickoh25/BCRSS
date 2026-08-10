from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ('resources', '0003_alter_resource_category'),
        ('reviews', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='resource',
            field=models.ForeignKey(
                to='resources.resource',
                on_delete=django.db.models.deletion.CASCADE,
                related_name='reviews',
                null=True,
                blank=True,
                help_text='The resource the review is about. Borrowers review the resource owner they borrowed from.',
            ),
        ),
        migrations.AlterField(
            model_name='review',
            name='reviewer_role',
            field=models.CharField(
                max_length=20,
                choices=[('Lender', 'Lender'), ('Borrower', 'Borrower')],
                default='Borrower',
            ),
        ),
        migrations.AlterUniqueTogether(
            name='review',
            unique_together={('reviewer', 'target_user', 'resource')},
        ),
    ]
